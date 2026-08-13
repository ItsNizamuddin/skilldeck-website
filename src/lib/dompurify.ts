import createDOMPurify from 'dompurify';

let DOMPurify: any;

if (typeof window !== 'undefined') {
  DOMPurify = createDOMPurify(window);
} else {
  // Simple fallback on the server side to avoid bundling jsdom on Node.js
  DOMPurify = {
    sanitize: (html: string) => {
      if (typeof html !== 'string') return '';
      // Strip script tags using a basic regex to prevent immediate server-side XSS
      return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
  };
}

export default DOMPurify;
