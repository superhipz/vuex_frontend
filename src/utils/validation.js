let required = (propertyType) => {
  return (v) => (v && v.length > 0) || `You must input a ${propertyType}`;
};
let minLength = (propertyType, minLength) => {
  return (v) =>
    (v && v.length >= minLength) ||
    `${propertyType} must be at least ${minLength} characters`;
};

let maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`;
};

let emailFormat = () => {
  let regex = /\S+@\S+\.\S+/;
  return (v) => (v && regex.test(v)) || "Must be a valid email";
};

let phoneFormat = () => {
  let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return (v) => (v && regex.test(v)) || "Must be a valid phone number";
};

let imageFormat = () => {
  let regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  return (v) => (v && regex.test(v)) || "Image link is not valid";
};

let numberFormat = () => {
  let regex = /^[0-9.,]+$/;
  return (v) => (v && regex.test(v)) || "Quantity must be number";
};

export default {
  required,
  minLength,
  maxLength,
  emailFormat,
  phoneFormat,
  imageFormat,
  numberFormat,
};
