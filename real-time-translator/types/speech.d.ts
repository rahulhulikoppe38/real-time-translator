// types/speech.d.ts

export {}; // ensure it is a module

declare global {
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    onaudioend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    onaudiostart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    onend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
    start(): void;
    stop(): void;
    abort(): void;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    readonly isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
    SpeechRecognition: new () => SpeechRecognition;
  }
}
