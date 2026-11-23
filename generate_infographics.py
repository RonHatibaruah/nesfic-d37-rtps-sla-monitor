#!/usr/bin/env python3
"""
Sewa-Drishti NESFIC-D-37: 16:9 Widescreen Technological Framework Infographics
Generates 5 publication-grade high-impact architectural infographics:
1. infographic_architecture.png
2. infographic_bottlenecks.png
3. infographic_penalty_dbt.png
4. infographic_dopi_scoring.png
5. infographic_grant_budget.png
"""

import os
import matplotlib
# Use Agg backend for headless generation
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Arrow, Circle, PathPatch
import matplotlib.lines as mlines
from matplotlib.path import Path

# Setup output directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_ASSETS = os.path.join(BASE_DIR, 'public', 'assets')
PUBLIC_IMAGES = os.path.join(BASE_DIR, 'public', 'images')
DIST_ASSETS = os.path.join(BASE_DIR, 'dist', 'assets')
DIST_IMAGES = os.path.join(BASE_DIR, 'dist', 'images')

for d in [PUBLIC_ASSETS, PUBLIC_IMAGES, DIST_ASSETS, DIST_IMAGES]:
    os.makedirs(d, exist_ok=True)

# Color Constants
C_BG = '#ffffff'
C_GRID = '#f1f5f9'
C_NAVY = '#0f172a'
C_BLUE = '#0284c7'
C_BLUE_LIGHT = '#e0f2fe'
C_EMERALD = '#059669'
C_EMERALD_LIGHT = '#d1fae5'
C_AMBER = '#d97706'
C_AMBER_LIGHT = '#fef3c7'
C_ROSE = '#e11d48'
C_ROSE_LIGHT = '#ffe4e6'
C_PURPLE = '#7e22ce'
C_PURPLE_LIGHT = '#f3e8ff'
C_MUTED = '#64748b'
C_BORDER = '#cbd5e1'
C_BORDER_DARK = '#94a3b8'

def setup_canvas(title, subtitle, tag="NESFIC-D-37 · GOVT OF ASSAM"):
    """Initializes a 16:9 widescreen canvas with blueprint grid and header."""
    fig, ax = plt.subplots(figsize=(16, 9), dpi=150)
    fig.patch.set_facecolor(C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 1600)
    ax.set_ylim(0, 900)
    ax.axis('off')

    # Draw subtle blueprint background grid
    for x in range(0, 1601, 40):
        ax.axvline(x, color=C_GRID, linewidth=0.75, zorder=0)
    for y in range(0, 901, 40):
        ax.axhline(y, color=C_GRID, linewidth=0.75, zorder=0)
    
    # Header Accent Bar
    accent_bar = FancyBboxPatch((40, 868), 1520, 6,
                                boxstyle="round,pad=0,rounding_size=3",
                                facecolor=C_BLUE, edgecolor='none', zorder=2)
    ax.add_patch(accent_bar)

    # Top Tag / Category Badge
    tag_box = FancyBboxPatch((40, 830), 280, 26,
                             boxstyle="round,pad=0,rounding_size=6",
                             facecolor=C_BLUE_LIGHT, edgecolor=C_BLUE, linewidth=1, zorder=2)
    ax.add_patch(tag_box)
    ax.text(180, 843, tag,
            ha='center', va='center', fontsize=9.5, fontweight='bold', color=C_BLUE, family='sans-serif', zorder=3)

    # Secondary State Badge
    state_box = FancyBboxPatch((1340, 830), 220, 26,
                              boxstyle="round,pad=0,rounding_size=6",
                              facecolor=C_EMERALD_LIGHT, edgecolor=C_EMERALD, linewidth=1, zorder=2)
    ax.add_patch(state_box)
    ax.text(1450, 843, "SEWA-DRISHTI PLATFORM",
            ha='center', va='center', fontsize=9.5, fontweight='bold', color=C_EMERALD, family='sans-serif', zorder=3)

    # Main Header Title & Subtitle
    ax.text(40, 795, title,
            ha='left', va='center', fontsize=22, fontweight='heavy', color=C_NAVY, family='sans-serif', zorder=3)
    ax.text(40, 762, subtitle,
            ha='left', va='center', fontsize=12, fontweight='medium', color=C_MUTED, family='sans-serif', zorder=3)

    # Bottom Footer Status Bar
    footer_bar = FancyBboxPatch((40, 25), 1520, 32,
                                boxstyle="round,pad=0,rounding_size=6",
                                facecolor='#f8fafc', edgecolor=C_BORDER, linewidth=1, zorder=2)
    ax.add_patch(footer_bar)
    ax.text(60, 41, "North East Seva First Innovation Challenge 2026 (AISF / Govt of Assam) · Confidential Technical Proposal",
            ha='left', va='center', fontsize=9, fontweight='medium', color=C_MUTED, family='sans-serif', zorder=3)
    ax.text(1540, 41, "https://nesfic-d37-rtps-sla-monitor.pages.dev",
            ha='right', va='center', fontsize=9, fontweight='bold', color=C_BLUE, family='sans-serif', zorder=3)

    return fig, ax

def draw_metric_pill(ax, x, y, width, height, label, value, bg_color, border_color, text_color):
    pill = FancyBboxPatch((x, y), width, height,
                          boxstyle="round,pad=0,rounding_size=10",
                          facecolor=bg_color, edgecolor=border_color, linewidth=1.5, zorder=4)
    ax.add_patch(pill)
    ax.text(x + 15, y + height/2, label,
            ha='left', va='center', fontsize=9.5, fontweight='bold', color=C_NAVY, family='sans-serif', zorder=5)
    ax.text(x + width - 15, y + height/2, value,
            ha='right', va='center', fontsize=11, fontweight='heavy', color=text_color, family='sans-serif', zorder=5)

def draw_card(ax, x, y, width, height, title, subtitle, bg_color, border_color, header_bg, header_color):
    # Main Card
    card = FancyBboxPatch((x, y), width, height,
                          boxstyle="round,pad=0,rounding_size=12",
                          facecolor=bg_color, edgecolor=border_color, linewidth=1.5, zorder=2)
    ax.add_patch(card)
    
    # Header Strip
    h_height = 42
    header = FancyBboxPatch((x, y + height - h_height), width, h_height,
                            boxstyle="round,pad=0,rounding_size=12",
                            facecolor=header_bg, edgecolor='none', zorder=3)
    ax.add_patch(header)
    
    # Rect overlap to square bottom of header
    rect = patches.Rectangle((x, y + height - h_height), width, 12,
                             facecolor=header_bg, edgecolor='none', zorder=3)
    ax.add_patch(rect)
    
    ax.text(x + 20, y + height - 21, title,
            ha='left', va='center', fontsize=12, fontweight='bold', color=header_color, family='sans-serif', zorder=4)
    if subtitle:
        ax.text(x + width - 20, y + height - 21, subtitle,
                ha='right', va='center', fontsize=9.5, fontweight='bold', color=header_color, family='sans-serif', zorder=4)


# ==============================================================================
# 1. ARCHITECTURE & TELEMETRY PIPELINE INFOGRAPHIC
# ==============================================================================
def generate_infographic_architecture():
    fig, ax = setup_canvas(
        "SEWA-DRISHTI: ENTERPRISE TELEMETRY & SLA MONITORING ARCHITECTURE",
        "High-Throughput Event Ingestion, Real-Time TimescaleDB Analytics & Automated Multi-Channel Escalation"
    )

    # 4 Vertical Architecture Pillars
    pillars = [
        {
            "x": 40, "w": 350, "title": "1. INGESTION & EVENT BUS", "sub": "10k Events/sec",
            "bg": '#f0f9ff', "border": '#0284c7', "h_bg": '#0284c7', "h_col": '#ffffff',
            "items": [
                ("Sewa Setu Webhook Ingress", "Payload verification & HMAC SHA-256 signature check"),
                ("Kafka Stream Buffer", "Partitioned event queue; zero packet drop guarantee"),
                ("ASCRTPS CDC Stream", "Change Data Capture (Debezium) for legacy sync"),
                ("Ingestion Validator", "Schema enforcement & corrupted payload isolation")
            ]
        },
        {
            "x": 430, "w": 350, "title": "2. TIMESCALEDB & WORKER", "sub": "State Data Centre (ASDC)",
            "bg": '#ecfdf5', "border": '#059669', "h_bg": '#059669', "h_col": '#ffffff',
            "items": [
                ("Continuous Telemetry Worker", "Python Celery / Redis state aggregation workers"),
                ("TimescaleDB Hypertables", "Time-series chunking by district and service code"),
                ("PostGIS Spatial Extension", "District, Sub-Division, and Circle polygon mapping"),
                ("Materialized Rollups", "Hourly pre-computed disposal rates & SLA timers")
            ]
        },
        {
            "x": 820, "w": 350, "title": "3. INTELLIGENCE & DOPI ENGINE", "sub": "Analytical Core",
            "bg": '#fffbeb', "border": '#d97706', "h_bg": '#d97706', "h_col": '#ffffff',
            "items": [
                ("T-48h / T-24h Early Warning", "Predictive bottleneck detection before SLA breach"),
                ("DOPI Multi-Factor Scoring", "4-Pillar composite performance algorithm (0-100)"),
                ("Section 7/9 Auto-Penalty", "₹250/day statutory deduction computation"),
                ("Process Mining Tracer", "Field verification latency & stage deviation tracer")
            ]
        },
        {
            "x": 1210, "w": 350, "title": "4. MULTI-CHANNEL ESCALATION", "sub": "Executive Governance",
            "bg": '#fdf2f8', "border": '#db2777', "h_bg": '#db2777', "h_col": '#ffffff',
            "items": [
                ("SMS & WhatsApp Gateway", "Instant push alerts to Designated Public Servants"),
                ("e-Office Integration", "Auto-docket generation for First Appellate Authority"),
                ("CM & Chief Secretary View", "Executive Real-Time Radar & District Heatmaps"),
                ("Citizen Transparency Portal", "Public SLA ledger & DBT compensation tracker")
            ]
        }
    ]

    card_y = 200
    card_h = 520

    for p in pillars:
        draw_card(ax, p["x"], card_y, p["w"], card_h, p["title"], p["sub"], p["bg"], p["border"], p["h_bg"], p["h_col"])
        
        # Draw items inside card
        iy = card_y + card_h - 75
        for heading, desc in p["items"]:
            # Small pill tag
            item_box = FancyBboxPatch((p["x"] + 16, iy - 65), p["w"] - 32, 90,
                                      boxstyle="round,pad=0,rounding_size=8",
                                      facecolor='#ffffff', edgecolor=p["border"], linewidth=1, zorder=3)
            ax.add_patch(item_box)
            ax.text(p["x"] + 30, iy - 10, heading, fontsize=10.5, fontweight='bold', color=C_NAVY, family='sans-serif', zorder=4)
            ax.text(p["x"] + 30, iy - 32, desc, fontsize=8.5, fontweight='medium', color=C_MUTED, family='sans-serif',
                    wrap=True, zorder=4)
            iy -= 112

    # Draw Horizontal Flow Connectors between cards
    for i in range(3):
        x1 = pillars[i]["x"] + pillars[i]["w"]
        x2 = pillars[i+1]["x"]
        yc = card_y + card_h / 2
        ax.annotate("", xy=(x2 - 5, yc), xytext=(x1 + 5, yc),
                    arrowprops=dict(arrowstyle="->", color=C_BLUE, lw=3, mutation_scale=20), zorder=6)
        # Flow Badge
        f_pill = FancyBboxPatch((x1 + 4, yc - 14), x2 - x1 - 8, 28,
                                boxstyle="round,pad=0,rounding_size=5",
                                facecolor='#ffffff', edgecolor=C_BLUE, linewidth=1, zorder=7)
        ax.add_patch(f_pill)
        ax.text((x1 + x2)/2, yc, "JSON/gRPC", ha='center', va='center', fontsize=7.5, fontweight='bold', color=C_BLUE, zorder=8)

    # 4 Bottom Metric Callout Badges
    draw_metric_pill(ax, 40, 100, 350, 60, "INGESTION LATENCY", "< 3.2 Seconds", C_BLUE_LIGHT, C_BLUE, C_BLUE)
    draw_metric_pill(ax, 430, 100, 350, 60, "STREAM RELIABILITY", "99.9% Uptime", C_EMERALD_LIGHT, C_EMERALD, C_EMERALD)
    draw_metric_pill(ax, 820, 100, 350, 60, "PREDICTIVE ACCURACY", "94.6% Early Warning", C_AMBER_LIGHT, C_AMBER, C_AMBER)
    draw_metric_pill(ax, 1210, 100, 350, 60, "AUDIT COMPLIANCE", "100% Immutable", C_PURPLE_LIGHT, C_PURPLE, C_PURPLE)

    save_path = os.path.join(PUBLIC_ASSETS, "infographic_architecture.png")
    plt.savefig(save_path, bbox_inches='tight', dpi=150)
    plt.savefig(os.path.join(DIST_ASSETS, "infographic_architecture.png"), bbox_inches='tight', dpi=150)
    plt.close()
    print(f"Generated: {save_path}")


# ==============================================================================
# 2. PROCESS MINING & BOTTLENECK ANALYSIS INFOGRAPHIC
# ==============================================================================
def generate_infographic_bottlenecks():
    fig, ax = setup_canvas(
        "RTPS SERVICE DELIVERY PROCESS MINING & STAGE BOTTLENECK ANALYSIS",
        "End-to-End Application Lifecycle Diagnostic & Identification of Primary Latency Drivers"
    )

    stages = [
        {
            "name": "Stage 1: Citizen Submission & Document Scrutiny",
            "statutory": "24 Hours (1 Day)", "actual": "21.2 Hours", "share": "4.2% of Breaches",
            "status": "ON TRACK", "color": C_EMERALD, "bg": C_EMERALD_LIGHT,
            "desc": "Online application received via Sewa Setu / CSC; basic automated KYC & document checklist validation."
        },
        {
            "name": "Stage 2: Field Inquest & Verification (CRITICAL BOTTLENECK)",
            "statutory": "72 Hours (3 Days)", "actual": "112.4 Hours (+40.4h Overdue)", "share": "64.8% of Total Breaches",
            "status": "CRITICAL BOTTLENECK", "color": C_ROSE, "bg": C_ROSE_LIGHT,
            "desc": "Lot Mandal / Field Officer physical spot verification, boundary survey, and land record concordance."
        },
        {
            "name": "Stage 3: Supervisory Review & Recommendation",
            "statutory": "48 Hours (2 Days)", "actual": "38.6 Hours", "share": "6.8% of Breaches",
            "status": "OPTIMAL", "color": C_EMERALD, "bg": C_EMERALD_LIGHT,
            "desc": "Circle Officer / Supervisory review of field report; scrutiny of legal objections and report vetting."
        },
        {
            "name": "Stage 4: Competent Authority Approval & Sanction",
            "statutory": "24 Hours (1 Day)", "actual": "46.8 Hours (+22.8h Overdue)", "share": "22.3% of Total Breaches",
            "status": "WARNING - HIGH LATENCY", "color": C_AMBER, "bg": C_AMBER_LIGHT,
            "desc": "Designated Public Servant (DPS) / ADC formal digital signature and final statutory approval order."
        },
        {
            "name": "Stage 5: Certificate Generation & Citizen Handover",
            "statutory": "12 Hours (0.5 Day)", "actual": "9.4 Hours", "share": "1.9% of Breaches",
            "status": "ON TRACK", "color": C_EMERALD, "bg": C_EMERALD_LIGHT,
            "desc": "Automated QR-coded certificate issuance, Digilocker synchronization, and WhatsApp download delivery."
        }
    ]

    sy = 650
    for i, s in enumerate(stages):
        box = FancyBboxPatch((40, sy - 75), 1520, 85,
                             boxstyle="round,pad=0,rounding_size=10",
                             facecolor='#ffffff', edgecolor=s["color"], linewidth=2, zorder=2)
        ax.add_patch(box)

        # Stage Number Badge
        num_box = FancyBboxPatch((55, sy - 65), 55, 65,
                                 boxstyle="round,pad=0,rounding_size=8",
                                 facecolor=s["color"], edgecolor='none', zorder=3)
        ax.add_patch(num_box)
        ax.text(82, sy - 32, f"0{i+1}", ha='center', va='center', fontsize=18, fontweight='heavy', color='#ffffff', zorder=4)

        # Stage Title & Desc
        ax.text(130, sy - 18, s["name"], fontsize=12, fontweight='heavy', color=C_NAVY, family='sans-serif', zorder=4)
        ax.text(130, sy - 48, s["desc"], fontsize=9.5, fontweight='medium', color=C_MUTED, family='sans-serif', zorder=4)

        # Statutory vs Actual Timing Pills
        # Statutory
        p1 = FancyBboxPatch((960, sy - 58), 150, 50,
                            boxstyle="round,pad=0,rounding_size=8",
                            facecolor='#f8fafc', edgecolor=C_BORDER, linewidth=1, zorder=3)
        ax.add_patch(p1)
        ax.text(1035, sy - 25, "STATUTORY BUDGET", ha='center', va='center', fontsize=7.5, fontweight='bold', color=C_MUTED, zorder=4)
        ax.text(1035, sy - 44, s["statutory"], ha='center', va='center', fontsize=10, fontweight='bold', color=C_NAVY, zorder=4)

        # Actual
        p2 = FancyBboxPatch((1130, sy - 58), 170, 50,
                            boxstyle="round,pad=0,rounding_size=8",
                            facecolor=s["bg"], edgecolor=s["color"], linewidth=1, zorder=3)
        ax.add_patch(p2)
        ax.text(1215, sy - 25, "OBSERVED MEDIAN", ha='center', va='center', fontsize=7.5, fontweight='bold', color=s["color"], zorder=4)
        ax.text(1215, sy - 44, s["actual"], ha='center', va='center', fontsize=10.5, fontweight='heavy', color=s["color"], zorder=4)

        # Status Tag
        p3 = FancyBboxPatch((1320, sy - 58), 220, 50,
                            boxstyle="round,pad=0,rounding_size=8",
                            facecolor=s["bg"], edgecolor=s["color"], linewidth=1.5, zorder=3)
        ax.add_patch(p3)
        ax.text(1430, sy - 25, s["status"], ha='center', va='center', fontsize=8.5, fontweight='heavy', color=s["color"], zorder=4)
        ax.text(1430, sy - 44, s["share"], ha='center', va='center', fontsize=9.5, fontweight='bold', color=s["color"], zorder=4)

        sy -= 105

    # Bottom Callout Summary
    summary_card = FancyBboxPatch((40, 85), 1520, 95,
                                  boxstyle="round,pad=0,rounding_size=10",
                                  facecolor='#fef2f2', edgecolor=C_ROSE, linewidth=2, zorder=2)
    ax.add_patch(summary_card)
    ax.text(65, 145, "DIAGNOSTIC CONCLUSION & CORRECTIVE INTERVENTION", fontsize=11, fontweight='heavy', color=C_ROSE, zorder=3)
    ax.text(65, 115, "• Stage 2 (Field Verification) drives 64.8% of all SLA breaches due to manual paper inquests and lack of intermediate milestones.\n• Intervention: Sewa-Drishti enforces automated T-48h push alerts, GPS-tagged mobile field inspections, and supervisory re-allocation.",
            fontsize=9.5, fontweight='medium', color=C_NAVY, family='sans-serif', zorder=3)

    save_path = os.path.join(PUBLIC_ASSETS, "infographic_bottlenecks.png")
    plt.savefig(save_path, bbox_inches='tight', dpi=150)
    plt.savefig(os.path.join(DIST_ASSETS, "infographic_bottlenecks.png"), bbox_inches='tight', dpi=150)
    plt.close()
    print(f"Generated: {save_path}")


# ==============================================================================
# 3. STATUTORY ENFORCEMENT & DBT COMPENSATION INFOGRAPHIC
# ==============================================================================
def generate_infographic_penalty_dbt():
    fig, ax = setup_canvas(
        "STATUTORY ENFORCEMENT & CITIZEN COMPENSATION ENGINE (SECTION 7 & 9)",
        "Automated Penalty Deduction, Appellate Workflow & Direct Benefit Transfer Compensation Model"
    )

    steps = [
        {
            "step": "STEP 1", "title": "SLA BREACH DETECTION",
            "w": 350, "x": 40, "color": C_ROSE, "bg": C_ROSE_LIGHT,
            "desc": "Continuous Telemetry Engine monitors application timeline against notified RTPS service schedule (e.g. 30 days).\n\nIf T_elapsed > T_statutory without valid recorded legal stay, an automated breach docket is instantiated.",
            "metrics": "Zero Manual Discretion"
        },
        {
            "step": "STEP 2", "title": "PENALTY FORMULATION",
            "w": 350, "x": 430, "color": C_AMBER, "bg": C_AMBER_LIGHT,
            "desc": "Statutory fine formulated strictly under Section 7 of Assam RTPS Act:\n\nFine = ₹250 per day of unjustified delay, capped at ₹25,000 maximum per application.\n\nAccrues automatically on Designated Public Servant (DPS) ledger.",
            "metrics": "₹250 / Day of Delay"
        },
        {
            "step": "STEP 3", "title": "APPELLATE SHOW-CAUSE",
            "w": 350, "x": 820, "color": C_BLUE, "bg": C_BLUE_LIGHT,
            "desc": "Case auto-docketed to First Appellate Authority (FAA) via e-Office API.\n\nDPS given 7-day statutory show-cause response window to furnish valid justification.\n\nIf unanswered or rejected, FAA ratifies deduction.",
            "metrics": "7-Day Notice Window"
        },
        {
            "step": "STEP 4", "title": "DBT DISBURSEMENT",
            "w": 350, "x": 1210, "color": C_EMERALD, "bg": C_EMERALD_LIGHT,
            "desc": "Under Section 9 citizen compensation provisions, recovered fine is automatically split:\n\n• 80% to Citizen as direct compensation via PFMS / Aadhaar DBT.\n• 20% to State Treasury administrative enforcement fund.",
            "metrics": "80% Citizen Share (DBT)"
        }
    ]

    card_y = 280
    card_h = 440

    for s in steps:
        draw_card(ax, s["x"], card_y, s["w"], card_h, s["title"], s["step"], s["bg"], s["color"], s["color"], '#ffffff')
        
        # Description
        ax.text(s["x"] + 20, card_y + card_h - 75, s["desc"], fontsize=9.5, fontweight='medium', color=C_NAVY,
                wrap=True, family='sans-serif', zorder=3)
        
        # Metric Badge inside card
        b_box = FancyBboxPatch((s["x"] + 20, card_y + 25), s["w"] - 40, 48,
                               boxstyle="round,pad=0,rounding_size=8",
                               facecolor='#ffffff', edgecolor=s["color"], linewidth=1.5, zorder=3)
        ax.add_patch(b_box)
        ax.text(s["x"] + s["w"]/2, card_y + 49, s["metrics"], ha='center', va='center',
                fontsize=11, fontweight='heavy', color=s["color"], zorder=4)

    # Connecting Flow Arrows
    for i in range(3):
        x1 = steps[i]["x"] + steps[i]["w"]
        x2 = steps[i+1]["x"]
        yc = card_y + card_h / 2
        ax.annotate("", xy=(x2 - 5, yc), xytext=(x1 + 5, yc),
                    arrowprops=dict(arrowstyle="->", color=C_BLUE, lw=3, mutation_scale=20), zorder=6)

    # Bottom Compensation Split Architecture Diagram
    split_card = FancyBboxPatch((40, 85), 1520, 150,
                                boxstyle="round,pad=0,rounding_size=10",
                                facecolor='#f8fafc', edgecolor=C_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(split_card)
    ax.text(65, 205, "STATUTORY SPLIT ENFORCEMENT UNDER ASSAM RTPS ACT 2012 (SECTION 7 & 9)", fontsize=11, fontweight='heavy', color=C_NAVY, zorder=3)

    # 80% Bar
    bar_citizen = FancyBboxPatch((65, 120), 1050, 55,
                                 boxstyle="round,pad=0,rounding_size=8",
                                 facecolor=C_EMERALD, edgecolor='none', zorder=3)
    ax.add_patch(bar_citizen)
    ax.text(590, 147, "80% CITIZEN DIRECT BENEFIT TRANSFER (DBT) COMPENSATION (Aadhaar PFMS Transfer)",
            ha='center', va='center', fontsize=11, fontweight='heavy', color='#ffffff', zorder=4)

    # 20% Bar
    bar_state = FancyBboxPatch((1135, 120), 400, 55,
                               boxstyle="round,pad=0,rounding_size=8",
                               facecolor=C_BLUE, edgecolor='none', zorder=3)
    ax.add_patch(bar_state)
    ax.text(1335, 147, "20% STATE TREASURY RESERVE",
            ha='center', va='center', fontsize=10.5, fontweight='heavy', color='#ffffff', zorder=4)

    save_path = os.path.join(PUBLIC_ASSETS, "infographic_penalty_dbt.png")
    plt.savefig(save_path, bbox_inches='tight', dpi=150)
    plt.savefig(os.path.join(DIST_ASSETS, "infographic_penalty_dbt.png"), bbox_inches='tight', dpi=150)
    plt.close()
    print(f"Generated: {save_path}")


# ==============================================================================
# 4. DOPI MULTI-FACTOR SCORING INFOGRAPHIC
# ==============================================================================
def generate_infographic_dopi_scoring():
    fig, ax = setup_canvas(
        "DOPI (DESIGNATED OFFICER PERFORMANCE INDEX) MULTI-FACTOR SCORING",
        "Holistic 4-Pillar Algorithmic Evaluation for Public Administration Accountability"
    )

    pillars = [
        {
            "weight": "40% WEIGHT", "title": "Pillar 1: On-Time Clearance Rate",
            "x": 40, "color": C_BLUE, "bg": C_BLUE_LIGHT,
            "formula": "Score = (N_ontime / N_total) × 100",
            "desc": "Evaluates percentage of statutory service applications completely disposed within the mandated RTPS timeline.\n\nStrict 40% primary weight prevents officers from accumulating chronic pendency."
        },
        {
            "weight": "30% WEIGHT", "title": "Pillar 2: Overdue Aging Severity",
            "x": 430, "color": C_ROSE, "bg": C_ROSE_LIGHT,
            "formula": "Penalty = Σ [2^(Overdue_Days / 5)]",
            "desc": "Exponential penalty formula punishing aging cases. A single case overdue by 30 days penalizes score 4x more than 6 cases overdue by 1 day.\n\nEliminates intentional burying of complex applications."
        },
        {
            "weight": "20% WEIGHT", "title": "Pillar 3: Disposal Velocity Index",
            "x": 820, "color": C_EMERALD, "bg": C_EMERALD_LIGHT,
            "formula": "Velocity = Median_Speed / Benchmark",
            "desc": "Benchmarked against state-wide departmental median. Rewards proactive officers who clear files significantly faster than the outer statutory limit.\n\nIncentivizes operational agility."
        },
        {
            "weight": "10% WEIGHT", "title": "Pillar 4: Citizen Grievance Redressal",
            "x": 1210, "color": C_AMBER, "bg": C_AMBER_LIGHT,
            "formula": "Score = Post-Delivery Rating (1-5)",
            "desc": "Direct citizen feedback collected via automated post-delivery IVR, SMS, and WhatsApp surveys.\n\nPenalizes superficial clearances where applicants report defective service delivery."
        }
    ]

    card_y = 350
    card_h = 370

    for p in pillars:
        draw_card(ax, p["x"], card_y, 350, card_h, p["title"], p["weight"], p["bg"], p["color"], p["color"], '#ffffff')
        
        # Formula box
        f_box = FancyBboxPatch((p["x"] + 20, card_y + card_h - 105), 310, 45,
                               boxstyle="round,pad=0,rounding_size=6",
                               facecolor='#ffffff', edgecolor=p["color"], linewidth=1, zorder=3)
        ax.add_patch(f_box)
        ax.text(p["x"] + 175, card_y + card_h - 82, p["formula"], ha='center', va='center',
                fontsize=9.5, fontweight='bold', color=p["color"], family='sans-serif', zorder=4)

        # Description
        ax.text(p["x"] + 20, card_y + card_h - 125, p["desc"], fontsize=9, fontweight='medium', color=C_NAVY,
                wrap=True, family='sans-serif', zorder=3)

    # Bottom Tier Classification Grid
    tier_card = FancyBboxPatch((40, 85), 1520, 230,
                               boxstyle="round,pad=0,rounding_size=10",
                               facecolor='#ffffff', edgecolor=C_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(tier_card)
    ax.text(65, 285, "STANDARDIZED DOPI PERFORMANCE TIERS & ADMINISTRATIVE INTERVENTIONS", fontsize=11, fontweight='heavy', color=C_NAVY, zorder=3)

    tiers = [
        {"tier": "TIER 1: EXEMPLARY (85 - 100)", "col": C_EMERALD, "bg": C_EMERALD_LIGHT, "x": 65,
         "action": "Chief Minister's Commendation Roll · Fast-track promotional priority · District Best Practice showcase."},
        {"tier": "TIER 2: SATISFACTORY (70 - 84)", "col": C_BLUE, "bg": C_BLUE_LIGHT, "x": 445,
         "action": "Routine operational clearance · Standard quarterly compliance review · No intervention required."},
        {"tier": "TIER 3: NEEDS IMPROVEMENT (50 - 69)", "col": C_AMBER, "bg": C_AMBER_LIGHT, "x": 825,
         "action": "Formal supervisory advisory by DC · Mandatory capacity re-training at Assam Administrative Staff College."},
        {"tier": "TIER 4: CHRONIC UNDERPERFORMER (<50)", "col": C_ROSE, "bg": C_ROSE_LIGHT, "x": 1205,
         "action": "Automated show-cause notice under Section 7 · Service record red mark · Inquest by Administrative Reforms."}
    ]

    for t in tiers:
        t_box = FancyBboxPatch((t["x"], 105), 350, 160,
                               boxstyle="round,pad=0,rounding_size=8",
                               facecolor=t["bg"], edgecolor=t["col"], linewidth=1.5, zorder=3)
        ax.add_patch(t_box)
        ax.text(t["x"] + 15, 235, t["tier"], fontsize=9.5, fontweight='heavy', color=t["col"], family='sans-serif', zorder=4)
        ax.text(t["x"] + 15, 170, t["action"], fontsize=8.5, fontweight='medium', color=C_NAVY, wrap=True, family='sans-serif', zorder=4)

    save_path = os.path.join(PUBLIC_ASSETS, "infographic_dopi_scoring.png")
    plt.savefig(save_path, bbox_inches='tight', dpi=150)
    plt.savefig(os.path.join(DIST_ASSETS, "infographic_dopi_scoring.png"), bbox_inches='tight', dpi=150)
    plt.close()
    print(f"Generated: {save_path}")


# ==============================================================================
# 5. GRANT BUDGET & RESOURCE ALLOCATION INFOGRAPHIC
# ==============================================================================
def generate_infographic_grant_budget():
    fig, ax = setup_canvas(
        "NESFIC-D-37 INDICATIVE GRANT ALLOCATION & RESOURCE BLUEPRINT",
        "Strategic Deployment of ₹40.00 Lakhs Problem Statement Grant Across 12 Months"
    )

    budget_items = [
        {
            "head": "1. TECHNICAL ENGINEERING TEAM", "share": "50.0%", "amount": "₹20.00 Lakhs",
            "x": 40, "color": C_BLUE, "bg": C_BLUE_LIGHT,
            "roles": [
                "1x Principal Solutions & Data Architect (Overall Design)",
                "1x Senior Backend & Kafka Pipeline Engineer (ASDC Core)",
                "1x Senior Frontend & React Dashboard Developer (UI/UX)",
                "1x QA & DevSecOps Automation Specialist (CI/CD & Security)"
            ]
        },
        {
            "head": "2. CLOUD INFRASTRUCTURE & ASDC", "share": "15.0%", "amount": "₹6.00 Lakhs",
            "x": 430, "color": C_EMERALD, "bg": C_EMERALD_LIGHT,
            "roles": [
                "Assam State Data Centre (ASDC) staging & sandbox servers",
                "TimescaleDB, Kafka & Redis cluster staging instances",
                "SMS & WhatsApp Business API gateway communication units",
                "CI/CD build pipelines and container registry hosting"
            ]
        },
        {
            "head": "3. FIELD PILOT & DISTRICT TRAINING", "share": "15.0%", "amount": "₹6.00 Lakhs",
            "x": 820, "color": C_AMBER, "bg": C_AMBER_LIGHT,
            "roles": [
                "Kamrup Metro & Cachar pilot district deployment workshops",
                "Onboarding & training of 200+ Designated Public Servants (DPS)",
                "Training manual printing & multi-lingual video modules (Assamese/Bengali)",
                "Field liaison support & citizen grievance feedback camps"
            ]
        },
        {
            "head": "4. SECURITY, VAPT & COMPLIANCE", "share": "10.0%", "amount": "₹4.00 Lakhs",
            "x": 1210, "color": C_PURPLE, "bg": C_PURPLE_LIGHT,
            "roles": [
                "CERT-In empanelled third-party VAPT & security audit",
                "Code quality audit, SonarQube SCA & SBOM compliance",
                "DPDP Act 2023 privacy audit & citizen data protection signoff",
                "ASDC network firewall & penetration test clearance"
            ]
        }
    ]

    card_y = 310
    card_h = 410

    for b in budget_items:
        draw_card(ax, b["x"], card_y, 350, card_h, b["head"], b["share"], b["bg"], b["color"], b["color"], '#ffffff')
        
        # Amount Pill
        amt_box = FancyBboxPatch((b["x"] + 20, card_y + card_h - 100), 310, 45,
                                 boxstyle="round,pad=0,rounding_size=6",
                                 facecolor='#ffffff', edgecolor=b["color"], linewidth=1.5, zorder=3)
        ax.add_patch(amt_box)
        ax.text(b["x"] + 175, card_y + card_h - 78, b["amount"], ha='center', va='center',
                fontsize=13, fontweight='heavy', color=b["color"], zorder=4)

        # Bullet items
        iy = card_y + card_h - 125
        for r in b["roles"]:
            ax.text(b["x"] + 20, iy, f"• {r}", fontsize=8.5, fontweight='medium', color=C_NAVY,
                    wrap=True, family='sans-serif', zorder=3)
            iy -= 58

    # Bottom Full Width Head 5 (Legal & Management) + Summary Bar
    head5_card = FancyBboxPatch((40, 85), 1520, 195,
                                boxstyle="round,pad=0,rounding_size=10",
                                facecolor='#f8fafc', edgecolor=C_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(head5_card)

    # Left Head 5 detail
    ax.text(65, 245, "5. LEGAL, GOVERNANCE & PROJECT MANAGEMENT · ₹4.00 LAKHS (10.0%)", fontsize=11, fontweight='heavy', color=C_NAVY, zorder=3)
    ax.text(65, 205, "• Assam RTPS Act Section 7 & 9 legal alignment with Judicial & Administrative Reforms Departments.\n• Project manager oversight, steering committee governance reviews, and statutory milestone reporting.",
            fontsize=9.5, fontweight='medium', color=C_MUTED, family='sans-serif', zorder=3)

    # Visual Stacked Grant Allocation Bar
    bar_y = 105
    bar_h = 45

    # 50% Tech
    ax.add_patch(FancyBboxPatch((65, bar_y), 740, bar_h, boxstyle="round,pad=0,rounding_size=6", facecolor=C_BLUE, edgecolor='none', zorder=3))
    ax.text(435, bar_y + 22, "50% TECHNICAL TEAM (₹20.00L)", ha='center', va='center', fontsize=9.5, fontweight='heavy', color='#ffffff', zorder=4)

    # 15% Cloud
    ax.add_patch(FancyBboxPatch((815, bar_y), 220, bar_h, boxstyle="round,pad=0,rounding_size=6", facecolor=C_EMERALD, edgecolor='none', zorder=3))
    ax.text(925, bar_y + 22, "15% CLOUD (₹6.00L)", ha='center', va='center', fontsize=8.5, fontweight='heavy', color='#ffffff', zorder=4)

    # 15% Pilot
    ax.add_patch(FancyBboxPatch((1045, bar_y), 220, bar_h, boxstyle="round,pad=0,rounding_size=6", facecolor=C_AMBER, edgecolor='none', zorder=3))
    ax.text(1155, bar_y + 22, "15% PILOT (₹6.00L)", ha='center', va='center', fontsize=8.5, fontweight='heavy', color='#ffffff', zorder=4)

    # 10% VAPT
    ax.add_patch(FancyBboxPatch((1275, bar_y), 140, bar_h, boxstyle="round,pad=0,rounding_size=6", facecolor=C_PURPLE, edgecolor='none', zorder=3))
    ax.text(1345, bar_y + 22, "10% VAPT (₹4L)", ha='center', va='center', fontsize=7.5, fontweight='heavy', color='#ffffff', zorder=4)

    # 10% Mgmt
    ax.add_patch(FancyBboxPatch((1425, bar_y), 130, bar_h, boxstyle="round,pad=0,rounding_size=6", facecolor=C_NAVY, edgecolor='none', zorder=3))
    ax.text(1490, bar_y + 22, "10% MGMT (₹4L)", ha='center', va='center', fontsize=7.5, fontweight='heavy', color='#ffffff', zorder=4)

    save_path = os.path.join(PUBLIC_ASSETS, "infographic_grant_budget.png")
    plt.savefig(save_path, bbox_inches='tight', dpi=150)
    plt.savefig(os.path.join(DIST_ASSETS, "infographic_grant_budget.png"), bbox_inches='tight', dpi=150)
    plt.close()
    print(f"Generated: {save_path}")


if __name__ == '__main__':
    print("Generating 16:9 widescreen technological framework infographics...")
    generate_infographic_architecture()
    generate_infographic_bottlenecks()
    generate_infographic_penalty_dbt()
    generate_infographic_dopi_scoring()
    generate_infographic_grant_budget()
    print("All 5 infographics successfully generated!")
