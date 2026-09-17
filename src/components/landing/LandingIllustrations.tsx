const palette = {
  line: "var(--landing-line)",
  surface: "var(--landing-surface)",
  pale: "var(--landing-pale)",
  sage: "var(--landing-sage)",
  clay: "var(--landing-clay)",
  phoneFooter: "var(--landing-phone-footer)",
  phoneFooterInk: "var(--landing-phone-footer-ink)",
};

function Play({ x, y, size = 18 }: { x: number; y: number; size?: number }) {
  return (
    <path
      d={`M${x} ${y}l${size} ${size / 2}-${size} ${size / 2}z`}
      fill={palette.line}
    />
  );
}

export function HeroClippingFlow() {
  return (
    <svg
      className="landing-art hero-flow"
      viewBox="0 0 1120 300"
      role="img"
      aria-label="A long video becomes three clips and verified earnings"
    >
      <g className="art-step art-video">
        <rect
          x="10"
          y="55"
          width="320"
          height="195"
          rx="12"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path d="M20 90h300v115H20z" fill={palette.pale} />
        <path
          d="M20 160q55-85 110 0t100 0q45-45 90-12v57H20z"
          fill={palette.sage}
        />
        <circle cx="230" cy="125" r="22" fill={palette.clay} />
        <Play x={145} y={125} size={32} />
        <path
          d="M36 226h250M36 221v12M48 221v12"
          stroke={palette.line}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          className="timeline-dot"
          cx="170"
          cy="226"
          r="8"
          fill={palette.pale}
        />
      </g>
      <path
        className="flow-line"
        pathLength="1"
        d="M333 156H795"
        fill="none"
        stroke={palette.line}
        strokeWidth="3"
        strokeDasharray="9 8"
      />
      <g
        className="art-step art-scissors"
        fill="none"
        stroke={palette.line}
        strokeWidth="4"
        strokeLinecap="round"
      >
        <circle cx="385" cy="174" r="12" />
        <circle cx="415" cy="174" r="12" />
        <path d="M394 165l30-48M406 165l-30-48" />
      </g>
      {[0, 1, 2].map((i) => {
        const x = 455 + i * 105;
        const y = 55 + (i % 2) * 10;
        const counterCenterOffset = [3.5, 2.5, -1.5][i];
        return (
          <g key={i} className={`art-step clip-card clip-${i + 1}`}>
            <g className="clip-phone" transform={`translate(${x} ${y})`}>
              <rect
                className="clip-phone__body"
                width="88"
                height="158"
                rx="9"
                fill={palette.surface}
                stroke={palette.line}
                strokeWidth="3"
              />
              <g className="clip-phone__thumbnail">
                <rect
                  x="6"
                  y="6"
                  width="76"
                  height="112"
                  rx="5"
                  fill={i === 1 ? palette.line : palette.pale}
                />
                <circle cx="51" cy="37" r="14" fill={palette.clay} />
                <path
                  d="M6 90q38-35 76-10v38H6z"
                  fill={i === 1 ? palette.clay : palette.sage}
                />
                <Play x={14} y={94} size={10} />
              </g>
              <g className="clip-phone__footer">
                <path
                  className="clip-phone__footer-shape"
                  d="M3 118h82v28q0 9-9 9H12q-9 0-9-9z"
                  fill={palette.phoneFooter}
                />
                <g transform={`translate(${44 + counterCenterOffset} 137)`}>
                  <g
                    className="clip-phone__views"
                    fill={palette.phoneFooterInk}
                  >
                    <path
                      d="M-26 0q8-8 16 0-8 8-16 0Z"
                      fill="none"
                      stroke={palette.phoneFooterInk}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <circle cx="-18" cy="0" r="2.75" />
                    <text x="-5" y="5" fontSize="14" fontFamily="Inter">
                      {["12K", "48K", "102K"][i]}
                    </text>
                  </g>
                </g>
              </g>
            </g>
            <path
              d={`M${x + 43} 40l${i * 3 - 6}-22M${x + 59} 42l12-18`}
              stroke={palette.clay}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        );
      })}
      <path
        className="flow-arrow"
        pathLength="1"
        d="M785 156h78m-14-13 14 13-14 13"
        fill="none"
        stroke={palette.line}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="art-step art-receipt">
        <g className="earnings-receipt" transform="translate(880 58)">
          <path
            className="receipt-shape"
            d="M0 10q10-10 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0v160q-10 10-20 0t-20 0-20 0-20 0-20 0-20 0-20 0-20 0-20 0-20 0-20 0z"
            fill="none"
            stroke={palette.line}
            strokeWidth="3"
          />
          <text
            className="receipt-label"
            x="20"
            y="48"
            fill={palette.line}
            fontFamily="Inter"
            fontSize="17"
            fontWeight="500"
          >
            Verified earnings
          </text>
          <text
            className="receipt-amount"
            x="20"
            y="88"
            fill={palette.line}
            fontFamily="Inter"
            fontSize="32"
            fontWeight="700"
          >
            NPR 1,250
          </text>
          <g className="receipt-lines">
            <path
              d="M20 116h94m-94 20h80m-80 20h66"
              stroke={palette.line}
              opacity=".3"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
          <g className="receipt-check">
            <circle cx="180" cy="145" r="22" fill={palette.sage} />
            <path
              className="check-line"
              pathLength="1"
              d="m169 145 8 8 15-19"
              fill="none"
              stroke={palette.line}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function AudienceArt({ creator = false }: { creator?: boolean }) {
  return (
    <svg
      className="landing-art audience-art"
      viewBox="0 0 260 300"
      aria-hidden="true"
    >
      <g className="phone-rise">
        <rect
          x={creator ? 35 : 55}
          y="55"
          width="125"
          height="205"
          rx="12"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
          transform={creator ? "rotate(3 95 150)" : "rotate(-3 110 155)"}
        />
        <circle cx={creator ? 100 : 135} cy="105" r="24" fill={palette.clay} />
        <path
          d={
            creator
              ? "M38 195q55-50 138-8v58H38z"
              : "M58 190q50-55 120-5v65H58z"
          }
          fill={palette.sage}
        />
        <Play x={creator ? 80 : 40} y={creator ? 160 : 145} size={20} />
      </g>
      {creator ? (
        <g className="mini-clips">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x="185"
              y={70 + i * 70}
              width="48"
              height="62"
              rx="7"
              fill={i === 1 ? palette.line : palette.pale}
              stroke={palette.line}
              strokeWidth="3"
            />
          ))}
          <path
            className="check-line"
            pathLength="1"
            d="m194 167 8 8 17-20"
            fill="none"
            stroke={palette.clay}
            strokeWidth="4"
          />
        </g>
      ) : (
        <g className="notification-pop">
          <rect
            x="155"
            y="145"
            width="42"
            height="58"
            rx="8"
            fill={palette.line}
          />
          <path
            d="M176 186c-20-13-15-31 0-21 15-10 20 8 0 21"
            fill={palette.clay}
          />
          <path
            d="M38 80l-10-20m25 15 3-25"
            stroke={palette.clay}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

export function EarningsFlow() {
  return (
    <svg
      className="landing-art earnings-flow"
      viewBox="0 0 900 250"
      role="img"
      aria-label="Clip submitted, views verified, quality reviewed, and earnings paid"
    >
      <path
        className="process-line"
        pathLength="1"
        d="M105 120H690"
        fill="none"
        stroke={palette.line}
        strokeWidth="3"
      />
      <g className="process-step p1">
        <rect
          x="25"
          y="35"
          width="90"
          height="130"
          rx="9"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
        />
        <circle cx="78" cy="70" r="15" fill={palette.clay} />
        <path d="M31 130q45-40 78-8v37H31z" fill={palette.sage} />
        <text
          x="18"
          y="205"
          fill={palette.line}
          fontFamily="Inter"
          fontSize="18"
        >
          Clip submitted
        </text>
      </g>
      <g className="process-step p2">
        <rect
          x="180"
          y="68"
          width="145"
          height="100"
          rx="9"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path
          d="M225 52q25-30 50 0-25 30-50 0"
          fill={palette.sage}
          stroke={palette.line}
          strokeWidth="3"
        />
        <circle cx="250" cy="52" r="7" fill={palette.line} />
        <text
          x="202"
          y="115"
          fill={palette.line}
          fontFamily="Inter"
          fontWeight="700"
          fontSize="28"
        >
          12,480
        </text>
        <text
          x="207"
          y="140"
          fill={palette.line}
          fontFamily="Inter"
          fontSize="15"
        >
          verified views
        </text>
        <text
          x="215"
          y="205"
          fill={palette.line}
          fontFamily="Inter"
          fontSize="18"
        >
          Verified
        </text>
      </g>
      <g className="process-step p3">
        <circle cx="445" cy="113" r="42" fill={palette.clay} />
        <circle cx="515" cy="113" r="42" fill={palette.sage} />
        <circle cx="445" cy="82" r="16" fill={palette.pale} />
        <circle cx="515" cy="82" r="16" fill={palette.pale} />
        <rect
          x="456"
          y="94"
          width="50"
          height="42"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="2"
        />
        <Play x={474} y={103} size={14} />
        <circle cx="480" cy="45" r="22" fill={palette.clay} />
        <path
          className="check-line"
          pathLength="1"
          d="m469 45 8 8 15-19"
          fill="none"
          stroke={palette.surface}
          strokeWidth="4"
        />
        <text
          x="423"
          y="205"
          fill={palette.line}
          fontFamily="Inter"
          fontSize="18"
        >
          Quality reviewed
        </text>
      </g>
      <g className="process-step p4">
        <g className="payment-receipt" transform="translate(690 35)">
          <path
            className="payment-receipt__shape"
            d="M0 10q8-8 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0v140q-8 8-16 0t-16 0-16 0-16 0-16 0-16 0-16 0-16 0-16 0-16 0-16 0-16 0z"
            fill={palette.surface}
            stroke={palette.line}
            strokeWidth="3"
          />
          <text
            className="payment-receipt__label"
            x="18"
            y="43"
            fill={palette.line}
            fontFamily="Inter"
            fontSize="14"
            fontWeight="500"
          >
            Available earnings
          </text>
          <text
            className="payment-receipt__amount"
            x="18"
            y="78"
            fill={palette.line}
            fontFamily="Inter"
            fontSize="27"
            fontWeight="700"
          >
            NPR 1,250
          </text>
          <g className="payment-receipt__lines">
            <path
              d="M18 102h76m-76 17h60m-60 17h46"
              stroke={palette.line}
              opacity=".28"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
          <g className="payment-receipt__check">
            <circle cx="158" cy="124" r="19" fill={palette.sage} />
            <path
              className="check-line"
              pathLength="1"
              d="m148 124 7 7 13-17"
              fill="none"
              stroke={palette.line}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <text
          x="786"
          y="205"
          fill={palette.line}
          fontFamily="Inter"
          fontSize="18"
          textAnchor="middle"
        >
          Paid
        </text>
      </g>
    </svg>
  );
}

export function HumanCTAArt() {
  return (
    <svg
      className="landing-art human-cta-art"
      viewBox="0 0 1120 260"
      aria-hidden="true"
    >
      <g className="creator-person">
        <circle
          cx="110"
          cy="90"
          r="31"
          fill={palette.pale}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path
          d="M70 140q40-42 80 0l24 90H45z"
          fill={palette.clay}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path
          d="M145 150q45 20 70 2"
          fill="none"
          stroke={palette.line}
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect
          x="205"
          y="105"
          width="28"
          height="55"
          rx="5"
          fill={palette.line}
        />
        <circle
          className="record-pulse"
          cx="219"
          cy="115"
          r="4"
          fill={palette.clay}
        />
      </g>
      <path
        className="cta-connector"
        pathLength="1"
        d="M235 150q70 45 130 0h80m260 0h80q55 45 110 0"
        fill="none"
        stroke={palette.clay}
        strokeWidth="3"
      />
      <g className="cta-media">
        <rect
          x="370"
          y="95"
          width="120"
          height="78"
          rx="7"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
        />
        <Play x={420} y={117} size={24} />
        <path
          d="M505 134h70m-12-12 12 12-12 12"
          stroke={palette.line}
          strokeWidth="3"
          fill="none"
        />
        <rect
          x="598"
          y="72"
          width="62"
          height="110"
          rx="8"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
        />
        <circle cx="630" cy="98" r="12" fill={palette.clay} />
        <Play x={618} y={137} size={13} />
        <path
          d="M675 146h65m-12-12 12 12-12 12"
          stroke={palette.line}
          strokeWidth="3"
          fill="none"
        />
        <rect
          x="755"
          y="96"
          width="62"
          height="82"
          rx="7"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path
          className="check-line"
          pathLength="1"
          d="m772 138 10 10 20-25"
          fill="none"
          stroke={palette.sage}
          strokeWidth="5"
        />
      </g>
      <g className="clipper-person">
        <circle
          cx="1000"
          cy="88"
          r="31"
          fill={palette.pale}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path
          d="M955 140q45-42 90 0l28 90H930z"
          fill={palette.sage}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path
          d="M955 157q-50 25-90 4"
          fill="none"
          stroke={palette.line}
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M860 150h115l-25 60H835z"
          fill={palette.surface}
          stroke={palette.line}
          strokeWidth="3"
        />
        <Play x={894} y={163} size={19} />
      </g>
    </svg>
  );
}
