declare module '@exuanbo/file-icons-js' {
  interface classOption {
    color: boolean;
    array: boolean;
  }
  const icon: {
    getClass: (
      name: string,
      options?: classOption
    ) => Promise<string | string[]>;
  };
  export default icon;
}
