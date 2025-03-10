# narrative_graph.py
import json
import networkx as nx
import plotly.graph_objects as go
import plotly.express as px
import textwrap

def generate_narrative_graph():
    # Load JSON file
    with open("narrative_genome_amazon.json", "r") as f:
        data = json.load(f)

    # Create graph
    G = nx.Graph()

    # Extract unique node types for color mapping
    unique_types = list(set(node["type"] for node in data["nodes"]))
    color_map = {t: px.colors.qualitative.Plotly[i % len(px.colors.qualitative.Plotly)] for i, t in enumerate(unique_types)}

    # Add nodes with importance as node size and color based on type
    for node in data["nodes"]:
        importance = node.get("importance")  # Get the importance, or None
        if importance is not None:
            importance = float(importance)  # Convert importance to float
        else:
            importance = 2.0  # Default importance
        G.add_node(node["id"], size=importance, type=node["type"], color=color_map[node["type"]])

    # Add edges with importance as edge width
    for edge in data["edges"]:
        weight = float(edge["importance"])  # Convert importance to float
        G.add_edge(edge["source"], edge["target"], weight=weight)

    # Get positions using force-directed layout with more spread
    pos = nx.spring_layout(G, k=1.5, iterations=100, seed=42)  # Increased k for more spread

    # Extract node and edge data for Plotly
    node_x, node_y, node_sizes, node_colors, node_labels, node_font_sizes = [], [], [], [], [], []
    for node in G.nodes():
        x, y = pos[node]
        node_x.append(x)
        node_y.append(y)
        node_sizes.append(G.nodes[node].get("size", 1) * 5)  # Reduce size scaling
        node_colors.append(G.nodes[node].get("color", "grey"))
        # Wrap node labels to fit within nodes
        wrapped_label = "<b>" + "<br>".join(textwrap.wrap(node, width=8)) + "</b>"  # Reduced width, bold text
        node_labels.append(wrapped_label)
        # Shrink font size based on node size (importance)
        font_size = max(5, min(10, G.nodes[node].get("size", 1) * 0.9))  # Further reduced font sizes and multiplier
        node_font_sizes.append(font_size)

    # Create Plotly figure
    fig = go.Figure()

    # Add edges (one trace per edge)
    for edge in G.edges():
        x0, y0 = pos[edge[0]]
        x1, y1 = pos[edge[1]]
        width = G.edges[edge]['weight'] * 0.5  # Scale down the edge width
        fig.add_trace(go.Scatter(
            x=[x0, x1],
            y=[y0, y1],
            line=dict(width=width, color='gray'),
            hoverinfo='none',
            mode='lines'
        ))

    # Add nodes with labels inside
    fig.add_trace(go.Scatter(
        x=node_x, y=node_y,
        mode='markers+text',
        text=node_labels,
        textposition="middle center",  # Position text inside nodes
        hoverinfo='text',
        textfont=dict(size=node_font_sizes),  # Apply dynamic font sizes
        marker=dict(
            size=node_sizes,
            color=node_colors,
            opacity=0.8,
            line=dict(width=2, color='black')
        )
    ))

    # Update layout for better interactivity
    fig.update_layout(
        title="Interactive Narrative Genome Graph (Zoom & Pan Enabled)",
        showlegend=False,
        hovermode='closest',
        margin=dict(b=0, l=0, r=0, t=40),
        xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
        yaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
    )

    # Return the Plotly figure as JSON
    return fig.to_json()