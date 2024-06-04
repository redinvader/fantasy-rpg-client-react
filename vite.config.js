import { resolve, dirname, join } from 'path'
import { defineConfig , loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv( process.env.NODE_ENV || 'development', process.cwd() )
console.log( env)


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: {'@': resolve(__dirname, './src') },
  },
  build:{},
  server:{
    port: 9090,
    proxy:{
      '/apis':{
        target:env.VITE_FANTASY_API,
        changeOrigin: true,
        secure:false,
        rewrite: ( path ) => path.replace(/^\/apis/, '')
      }
    }
  }

})
