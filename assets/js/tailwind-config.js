/* Shared Tailwind configuration. Owned by the Team Lead. DO NOT EDIT. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: { DEFAULT: '#1E3A6D', deep: '#12254A' },
        teal: { DEFAULT: '#00C4DF', dark: '#00788C', soft: '#E0F8FC' },
        ice: { DEFAULT: '#F4F8FB', 2: '#E3ECF4' },
        body: '#4A5568',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,37,74,.06), 0 10px 28px -14px rgba(18,37,74,.18)',
        'card-lg': '0 2px 4px rgba(18,37,74,.08), 0 26px 50px -18px rgba(18,37,74,.32)',
        offset: '14px 14px 0 0 #00C4DF',
        'offset-navy': '14px 14px 0 0 #1E3A6D',
        'offset-sm': '8px 8px 0 0 #00C4DF',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideLeft: { '0%': { opacity: '0', transform: 'translateX(-48px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(48px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        wipe: { '0%': { clipPath: 'inset(0 100% 0 0)' }, '100%': { clipPath: 'inset(0 0 0 0)' } },
        kenburns: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.1)' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(.9)', opacity: '.8' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        growX: { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
      },
      animation: {
        'fade-up': 'fadeUp .8s ease-out both',
        'fade-in': 'fadeIn .9s ease-out both',
        'slide-left': 'slideLeft .8s ease-out both',
        'slide-right': 'slideRight .8s ease-out both',
        wipe: 'wipe 1.1s cubic-bezier(.77,0,.18,1) both',
        kenburns: 'kenburns 18s ease-in-out infinite alternate',
        bob: 'bob 4s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'grow-x': 'growX .9s ease-out both',
      },
    },
  },
};
