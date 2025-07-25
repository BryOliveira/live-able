import * as React from "react";
/**
 * Renders an SVG illustration of a stylized flower.
 *
 * @param props - Standard SVG properties to customize the SVG element.
 * @returns A React functional component displaying a flower SVG.
 */
const Flower = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={89}
    height={96}
    viewBox="0 0 89 96"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      style={{
        display: "inline",
        opacity: 1,
      }}
    >
      <path
        style={{
          fill: "#0a8754",
          fillOpacity: 1,
          strokeWidth: 0.334673,
        }}
        d="M50.943 76.208s-1.18 3.952-3.933 3.934c-2.753-.02-3.046.403-3.046.403s-1.889.82-1.4 3.326c1.05.256 2.826-.06 5.134-1.367-.774 1.351-3.071 1.803-4.79 2.318.237.391 1.545 2.284 4.795 1.706.125-.022 2.66-1.161 3.558-4.757.9-3.596-.318-5.563-.318-5.563"
        transform="rotate(30 337.263 17.662)scale(2.53967)"
      />
      <path
        style={{
          fill: "#0a8754",
          fillOpacity: 1,
          strokeWidth: 0.25668,
        }}
        d="M32.076 74.684s-2.798 4.203-1.442 8.247 4.698 4.916 7.111 2.776c.604-.535-1.082.575-3.948-3.507.618.306 1.773 1.976 4.715 2.62.868-1.711.146-3.022-.036-3.26-.505-.937-1.363-1.306-2.413-1.465-1.71-.174-2.819-1.922-2.819-1.922s-1.064-1.642-1.168-3.489"
        transform="rotate(30 337.263 17.662)scale(2.53967)"
      />
      <path
        style={{
          fill: "#0a8754",
          fillOpacity: 1,
          strokeWidth: 0.564965,
        }}
        d="M39.896 74.193s-1.677 6.081.157 11.492c1.833 5.41 5.566 7.243 5.566 7.243l2.169-1.184s-5.224-4.724-5.854-6.956l-.001-.004-.007-.017-.009-.022-.008-.03-.003-.009-.005-.014-.01-.028-.009-.022-.01-.02-.008-.022-.006-.02-.007-.017-.005-.016-.004-.002-.025-.075-.012-.032v-.011c-.114-.308-1.41-3.95-1.238-9.965z"
        transform="rotate(30 337.263 17.662)scale(2.53967)"
      />
      <path
        style={{
          fill: "#5baae6",
          fillOpacity: 1,
        }}
        d="M49.408 56.522c7.36-4.408-11.837-9.224-7.43-1.864 4.408 7.36 9.224-11.837 1.864-7.43-7.36 4.408 11.837 9.224 7.43 1.864-4.408-7.36-9.224 11.837-1.864 7.43"
        transform="translate(-167.43 -199.228)scale(4.6009)"
      />
      <circle
        style={{
          fill: "#fea",
          fillOpacity: 1,
          strokeWidth: 3.8842,
        }}
        cx={47.468}
        cy={39.939}
        r={6.19}
      />
    </g>
  </svg>
);
export default Flower;
