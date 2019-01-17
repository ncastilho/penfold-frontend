const isNotEmpty = (value) => !!value && (value||'').toString().length > 0;

const validators = {
  name: [
    {
      test: isNotEmpty,
      msg: 'Name cannot be empty'
    },
  ],
  email: [
    {
      test: isNotEmpty,
      msg: 'Email cannot be empty'
    },
  ],
  mobile: [
    {
      test: isNotEmpty,
      msg: 'Mobile cannot be empty'
    },
  ],
}

export default validators;