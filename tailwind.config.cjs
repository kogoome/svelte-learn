const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [require('daisyui'), require('tailwindcss-neumorphism')],
  daisyui: {
    styled: true,
    themes: require('./daisyui.theme.cjs').themes,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
  }
}

module.exports = config
