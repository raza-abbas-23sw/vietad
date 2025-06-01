const IconStyle = {
  width: '100%',
  height: '100%',
  color: '#00BCD4'
};

export const DesignIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={IconStyle}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10h.01M16 10h.01M12 14l4-4" />
  </svg>
);

export const CustomizeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={IconStyle}
  >
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export const TemplateIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{...IconStyle, color: '#FFB74D'}}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

export const SizeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={IconStyle}
  >
    <path d="M21 3H3v18h18V3z" />
    <path d="M9 3v18M3 9h18" />
  </svg>
);

export default {
  DesignIcon,
  CustomizeIcon,
  TemplateIcon,
  SizeIcon
};