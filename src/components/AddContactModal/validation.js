const isNotEmpty = (value) => !!value && (value||'').toString().length > 0;
const isValidMobile = (value) => /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/.test(value);
const isValidEmail = (value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

const validators = {
  name: [
    {
      test: isNotEmpty,
      msg: 'Name cannot be empty'
    },
  ],
  email: [
    {
      test: isValidEmail,
      msg: 'Email address is not valid. e.g: james.bond@hotmail.com'
    },
  ],
  mobile: [
    {
      test: isValidMobile,
      msg: 'Mobile number is not valid. e.g: +44 7222 555 555 or 07222 555555'
    },
  ],
}

export default validators;