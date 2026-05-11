/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",                 // 必须有
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 必须有：扫描 src 下所有 Vue/TS 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
