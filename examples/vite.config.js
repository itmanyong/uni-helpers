import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UniPagesHelper } from "uni-helpers"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        UniPagesHelper({
            pagesDirs: ['src/pages/main', 'src/main/user', 'src/main/account'],
        }),
        uni(),
    ],
})
