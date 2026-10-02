export function TrajectoryGraphic() {
  return (
    <div className="hero-art">
      <div className="art-topline"><span>TRAJECTORY SPACE</span><span className="art-live"><i /> VERSIONED STATE</span></div>
      <svg className="trajectory" viewBox="0 0 640 430" role="img" aria-labelledby="trajectory-title trajectory-desc">
        <title id="trajectory-title">A mission branches into parallel agent trajectories</title>
        <desc id="trajectory-desc">Three candidate paths keep separate histories and evidence before reaching a shared review gate.</desc>
        <defs>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#d8d9d3" /></pattern>
          <linearGradient id="path-a" x1="0" x2="1"><stop stopColor="#a5b4fc" /><stop offset="1" stopColor="#6658d3" /></linearGradient>
          <linearGradient id="path-b" x1="0" x2="1"><stop stopColor="#7ac9b7" /><stop offset="1" stopColor="#188c75" /></linearGradient>
          <linearGradient id="path-c" x1="0" x2="1"><stop stopColor="#f2bd77" /><stop offset="1" stopColor="#dc8151" /></linearGradient>
        </defs>
        <rect width="640" height="430" fill="url(#dots)" opacity=".68" />
        <path className="orbit orbit-one" d="M119 216 C218 216 213 98 337 98 S427 216 528 216" />
        <path className="orbit orbit-two" d="M119 216 C218 216 213 216 337 216 S427 216 528 216" />
        <path className="orbit orbit-three" d="M119 216 C218 216 213 334 337 334 S427 216 528 216" />
        <path className="trace trace-one" d="M119 216 C218 216 213 98 337 98 S427 216 528 216" />
        <path className="trace trace-two" d="M119 216 C218 216 213 216 337 216 S427 216 528 216" />
        <path className="trace trace-three" d="M119 216 C218 216 213 334 337 334 S427 216 528 216" />
        <circle className="node node-origin" cx="119" cy="216" r="31" /><circle className="node-core" cx="119" cy="216" r="7" />
        <circle className="node node-a" cx="337" cy="98" r="24" /><circle className="node-core" cx="337" cy="98" r="5" />
        <circle className="node node-b" cx="337" cy="216" r="24" /><circle className="node-core" cx="337" cy="216" r="5" />
        <circle className="node node-c" cx="337" cy="334" r="24" /><circle className="node-core" cx="337" cy="334" r="5" />
        <circle className="node node-gate" cx="528" cy="216" r="30" /><path d="M519 216l6 6 12-13" className="gate-check" />
        <text x="119" y="273" textAnchor="middle" className="svg-label">MISSION</text>
        <text x="337" y="57" textAnchor="middle" className="svg-label svg-a">FORK A · SNAPSHOT</text>
        <text x="337" y="174" textAnchor="middle" className="svg-label svg-b">FORK B · SNAPSHOT</text>
        <text x="337" y="389" textAnchor="middle" className="svg-label svg-c">FORK C · SNAPSHOT</text>
        <text x="528" y="273" textAnchor="middle" className="svg-label">EVIDENCE GATE</text>
        <circle className="packet packet-a" r="5"><animateMotion dur="5.6s" repeatCount="indefinite" path="M119 216 C218 216 213 98 337 98 S427 216 528 216" /></circle>
        <circle className="packet packet-b" r="5"><animateMotion dur="4.8s" repeatCount="indefinite" path="M119 216 C218 216 213 216 337 216 S427 216 528 216" /></circle>
        <circle className="packet packet-c" r="5"><animateMotion dur="6.2s" repeatCount="indefinite" path="M119 216 C218 216 213 334 337 334 S427 216 528 216" /></circle>
      </svg>
      <div className="art-caption"><span>Same mission. Separate histories.</span><span className="mono">STATE ≠ ASSUMPTION</span></div>
    </div>
  );
}
