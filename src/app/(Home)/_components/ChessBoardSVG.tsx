export function ChessBoardSVG() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-27 -27 854 854"
      className="h-5w-[600px] w-[600px]"
    >
      <g id="Chessboard">
        <title>Modrá šachovnica</title>
        <desc>Blue chessboard, by Adam Stanislav</desc>

        <g id="Light" fill="#FFF" stroke="#005" stroke-width="5">
          <rect x="-25" y="-25" width="850" height="850" />
        </g>

        <g id="Frame" fill="none" stroke="#005" stroke-width="2">
          <rect width="800" height="800" />
        </g>

        <g id="Dark" fill="rgba(50,100,255,1)">
          <g id="raz">
            <g id="dva">
              <g id="tri">
                <rect x="100" width="100" height="100" />
                <rect x="300" width="100" height="100" />
                <rect x="500" width="100" height="100" />
                <rect x="700" width="100" height="100" />

                <rect x="100" y="200" width="100" height="100" />
                <rect x="300" y="200" width="100" height="100" />
                <rect x="500" y="200" width="100" height="100" />
                <rect x="700" y="200" width="100" height="100" />

                <rect x="100" y="400" width="100" height="100" />
                <rect x="300" y="400" width="100" height="100" />
                <rect x="500" y="400" width="100" height="100" />
                <rect x="700" y="400" width="100" height="100" />

                <rect x="100" y="600" width="100" height="100" />
                <rect x="300" y="600" width="100" height="100" />
                <rect x="500" y="600" width="100" height="100" />
                <rect x="700" y="600" width="100" height="100" />

                <rect x="0" y="100" width="100" height="100" />
                <rect x="200" y="100" width="100" height="100" />
                <rect x="400" y="100" width="100" height="100" />
                <rect x="600" y="100" width="100" height="100" />

                <rect x="0" y="300" width="100" height="100" />
                <rect x="200" y="300" width="100" height="100" />
                <rect x="400" y="300" width="100" height="100" />
                <rect x="600" y="300" width="100" height="100" />

                <rect x="0" y="500" width="100" height="100" />
                <rect x="200" y="500" width="100" height="100" />
                <rect x="400" y="500" width="100" height="100" />
                <rect x="600" y="500" width="100" height="100" />

                <rect x="0" y="700" width="100" height="100" />
                <rect x="200" y="700" width="100" height="100" />
                <rect x="400" y="700" width="100" height="100" />
                <rect x="600" y="700" width="100" height="100" />
              </g>
              <use transform="translate(-100,100)" />
            </g>
            <use transform="translate(0,200)" />
          </g>
          <use transform="translate(0,400)" />
        </g>
      </g>
    </svg>
  );
}
