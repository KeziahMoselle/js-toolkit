import DefaultTheme from 'vitepress/dist/client/theme-default';
import Preview from './components/Preview.vue';
import Badge from './components/Badge.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ToolkitPreview', Preview);
    app.component('Badge', Badge);
  }
}