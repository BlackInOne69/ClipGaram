import { useJourneyAnimation } from "./useJourneyAnimation";

export function ClipJourneyAnimation({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const progress = useJourneyAnimation();
  return (
    <svg
      className="journey"
      viewBox="0 0 800 610"
      role="img"
      aria-labelledby="journey-title journey-description"
      onAnimationEnd={(event) => {
        if (
          event.animationName === "draw" &&
          (event.target as Element).parentElement?.id === "verifiedCheck"
        )
          onComplete?.();
      }}
    >
      <title id="journey-title">From moments to verified earnings</title>
      <desc id="journey-description">
        A film is cut into three clips with 12 thousand, 48 thousand, and 102
        thousand views, leading to verified earnings of NPR 1,250.
      </desc>
      <defs>
        <clipPath id="film-window">
          <rect x="-15" y="114" width="240" height="124" rx="6" />
        </clipPath>
        <clipPath id="one-window">
          <rect x="279" y="79" width="127" height="173" rx="4" />
        </clipPath>
        <clipPath id="two-window">
          <rect x="438" y="91" width="127" height="154" rx="4" />
        </clipPath>
        <clipPath id="three-window">
          <rect x="600" y="79" width="127" height="173" rx="4" />
        </clipPath>
      </defs>
      <g id="filmStrip" className="film-strip">
        <g transform="rotate(4 120 180)">
          <path
            d="M-22 85H255V267H-22Z"
            className="art-dark film-border"
            strokeWidth="3"
          />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i} fill="var(--cg-paper)">
              <rect x={i * 29 - 12} y="95" width="14" height="12" rx="2" />
              <rect x={i * 29 - 12} y="247" width="14" height="12" rx="2" />
            </g>
          ))}
          <g clipPath="url(#film-window)">
            <rect
              x="-15"
              y="114"
              width="240"
              height="124"
              fill="var(--cg-art-pale)"
            />
            <rect
              x="-15"
              y="114"
              width="111"
              height="124"
              fill="var(--cg-art-mid)"
            />
            <circle cx="188" cy="154" r="17" className="art-accent" />
            <path d="M100 239Q160 190 235 192V251Z" fill="var(--cg-art-mid)" />
            <path d="M97 177Q165 184 205 238H97Z" className="art-dark" />
            <path d="M-15 220Q30 213 66 241H-15Z" fill="var(--cg-art-green)" />
            <path
              d="M28 152Q28 147 33 150L57 165Q62 168 57 171L33 188Q28 191 28 186Z"
              className="art-dark"
            />
          </g>
        </g>
      </g>
      <g id="cutLine" className="cut-line">
        <path d="M242 40V305" className="draw-line" strokeDasharray="12 16" />
        <path
          d="M242 95V267"
          strokeDasharray="12 16"
          style={{ stroke: "var(--cg-paper)" }}
        />
      </g>
      <g
        id="scissors"
        className="scissors"
        stroke="var(--cg-art-line)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      >
        <g className="scissor-blade blade-one">
          <path d="M230 357L256 307" />
          <circle cx="227" cy="366" r="9" />
        </g>
        <g className="scissor-blade blade-two">
          <path d="M254 357L227 307" />
          <circle cx="258" cy="366" r="9" />
        </g>
        <circle
          cx="242"
          cy="343"
          r="2"
          fill="var(--cg-background)"
          strokeWidth="2"
        />
      </g>
      <g id="clipOne" className="clip clip-one">
        <g transform="rotate(3 342 180)">
          <rect
            x="273"
            y="73"
            width="139"
            height="229"
            rx="10"
            className="clip-frame"
          />
          <g clipPath="url(#one-window)">
            <rect
              x="279"
              y="79"
              width="127"
              height="173"
              fill="var(--cg-paper)"
            />
            <circle cx="350" cy="143" r="21" className="art-accent" />
            <path
              d="M275 163Q335 173 377 242L412 270H275Z"
              fill="var(--cg-art-mid)"
            />
            <path
              d="M275 241C316 258 344 206 411 209V263H275Z"
              fill="var(--cg-art-green)"
            />
          </g>
        </g>
        <path d="M340 55L323 30M357 49L354 19" className="accent-rays" />
      </g>
      <g id="clipTwo" className="clip clip-two">
        <rect
          x="432"
          y="85"
          width="139"
          height="208"
          rx="10"
          className="clip-frame"
        />
        <g clipPath="url(#two-window)">
          <rect x="438" y="91" width="127" height="154" className="art-dark" />
          <path
            d="M436 119C501 130 495 193 570 205V248H436Z"
            fill="var(--cg-paper)"
          />
          <path d="M434 193Q495 202 548 246H434Z" className="art-accent" />
        </g>
        <path d="M497 71L501 42M515 74L529 56" className="accent-rays" />
      </g>
      <g id="clipThree" className="clip clip-three">
        <g transform="rotate(-3 663 180)">
          <rect
            x="594"
            y="73"
            width="139"
            height="229"
            rx="10"
            className="clip-frame"
          />
          <g clipPath="url(#three-window)">
            <rect
              x="600"
              y="79"
              width="127"
              height="173"
              fill="var(--cg-art-mid)"
            />
            <path
              d="M598 208C636 197 663 148 734 139V266H598Z"
              className="art-dark"
            />
            <path d="M624 256Q665 192 730 181V261Z" className="art-accent" />
          </g>
        </g>
        <path d="M630 49L633 19M649 54L665 31" className="accent-rays" />
      </g>
      <g
        id="viewCounts"
        className="view-counts"
        fill="var(--cg-paper)"
        fontSize="20"
        fontWeight="500"
      >
        {[
          { x: 302, y: 278, value: 12 },
          { x: 459, y: 269, value: 48 },
          { x: 620, y: 273, value: 102 },
        ].map(({ x, y, value }) => (
          <g key={value} transform={`translate(${x} ${y})`}>
            <path
              d="M-14 0Q-4-14 8 0Q-4 14-14 0Z"
              fill="none"
              stroke="var(--cg-paper)"
              strokeWidth="2.5"
            />
            <circle cx="-3" r="3" />
            <text x="20" y="7">
              {Math.round(value * progress)}K
            </text>
          </g>
        ))}
      </g>
      <g
        id="arrows"
        className="arrows"
        fill="none"
        stroke="var(--cg-art-line)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className="draw-line"
          pathLength="1"
          d="M332 317Q336 359 371 378M359 378L372 379L367 365"
        />
        <path
          className="draw-line"
          pathLength="1"
          d="M502 313V363M493 352L502 363L511 352"
        />
        <path
          className="draw-line"
          pathLength="1"
          d="M677 317Q675 359 643 378M655 379L641 379L646 365"
        />
      </g>
      <g id="receipt" className="receipt">
        <path
          d="M383 401Q383 382 397 388Q410 399 421 389Q428 385 435 389Q443 396 451 389Q458 385 465 389Q473 396 481 389Q488 385 495 389Q503 396 511 389Q518 385 525 389Q533 396 541 389Q548 385 555 389Q563 396 571 389Q578 385 585 389Q593 396 601 389Q626 380 626 401V574Q626 596 610 588Q599 580 588 589Q580 595 572 589Q564 582 556 589Q548 595 540 589Q532 582 524 589Q516 595 508 589Q500 582 492 589Q484 595 476 589Q468 582 460 589Q452 595 444 589Q436 582 428 589Q420 595 412 589Q404 582 396 589Q383 594 383 579Z"
          fill="var(--cg-background)"
          stroke="var(--cg-art-line)"
          strokeWidth="2.5"
        />
        <text
          x="409"
          y="437"
          fill="var(--cg-text)"
          fontSize="20"
          fontWeight="500"
        >
          Verified earnings
        </text>
        <text
          x="408"
          y="481"
          fill="var(--cg-text)"
          fontSize="39"
          fontWeight="700"
          letterSpacing="-1.5"
        >
          NPR 1,250
        </text>
        <path
          d="M414 504H537M414 526H520M414 548H506"
          stroke="var(--cg-text-muted)"
          opacity=".28"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
      <g id="verifiedCheck" className="verified-check">
        <circle cx="583" cy="541" r="29" fill="var(--cg-primary)" />
        <path
          className="draw-line"
          pathLength="1"
          d="M571 541L581 550L595 532"
          fill="none"
          stroke="var(--cg-text-inverse)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
