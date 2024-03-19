const errorFactory = function (name) {
  return class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = name;
    }
  };
};

export const InputError = errorFactory('InputError');
export const SpeechRecognitionError = errorFactory('SpeechRecognitionError');
