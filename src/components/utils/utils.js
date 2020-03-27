export const emailCheck = (value) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if(regex.test(value))
    {
      return true;
    }
  return false;
}
