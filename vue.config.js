module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/sass/_variables.scss";`
      }
    }
  }
};
