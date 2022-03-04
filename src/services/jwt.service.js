export const get_token = () => {
  return JSON.parse(localStorage.getItem("jwt"));
};

export const save_token = jwt => {
  localStorage.setItem("jwt", JSON.stringify(jwt));
};

export const destroy_token = () => {
  localStorage.removeItem("jwt");
};

export default { get_token, save_token, destroy_token };
