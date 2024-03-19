import { SpeechRecognitionError } from './errorsFactory';

export default class SpeechRecognitionSupport {
  error = new SpeechRecognitionError('not supported');
  speechRecognitionApi;
  constructor() {
    this.speechRecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  }

  getSpeechRecognition() {
    try {
      this.isSupported();
      return new this.speechRecognitionApi();
    } catch (err) {
      throw this.error;
    }
  }

  isSupported() {
    if (this.speechRecognitionApi) {
      return true;
    } else {
      return false;
    }
  }
}
