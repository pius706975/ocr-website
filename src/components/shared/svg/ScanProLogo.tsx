interface ScanProLogoProps {
    className?: string;
    size?: number;
}

const ScanProLogo = ({ className = '', size = 24 }: ScanProLogoProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}>
            {/* Outer scanning frame */}
            <rect
                x="2"
                y="2"
                width="28"
                height="28"
                rx="6"
                stroke="#7D8AF2"
                strokeWidth="2"
                fill="none"
            />

            {/* Corner brackets - top left */}
            <path
                d="M6 6L6 10M6 6L10 6"
                stroke="#7D8AF2"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Corner brackets - top right */}
            <path
                d="M26 6L26 10M26 6L22 6"
                stroke="#7D8AF2"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Corner brackets - bottom left */}
            <path
                d="M6 26L6 22M6 26L10 26"
                stroke="#7D8AF2"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Corner brackets - bottom right */}
            <path
                d="M26 26L26 22M26 22L22 26"
                stroke="#7D8AF2"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Central scanning element - stylized "S" */}
            <path
                d="M12 12C12 10.8954 12.8954 10 14 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H16C14.8954 14 14 14.8954 14 16V16C14 17.1046 14.8954 18 16 18H18C19.1046 18 20 18.8954 20 20V20C20 21.1046 19.1046 22 18 22H14C12.8954 22 12 21.1046 12 20"
                stroke="#7D8AF2"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />

            {/* Scanning line animation effect */}
            <line
                x1="8"
                y1="16"
                x2="24"
                y2="16"
                stroke="#7D8AF2"
                strokeWidth="1"
                opacity="0.6"
                strokeDasharray="2 2"
            />
        </svg>
    );
};

export default ScanProLogo;
