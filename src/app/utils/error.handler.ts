import { ErrorHandler } from '@angular/core';
import Swal from 'sweetalert2';

export class MyErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error(error);

    let errorMessage = error?.error?.message || 'Something went wrong!';

    if (typeof errorMessage === 'string' && errorMessage.includes('Validation errors:')) {
      const errors = errorMessage
        .replace('Validation errors: ', '')
        .split(', ')
        .map((err) => `<li>${err}</li>`)
        .join('');

      Swal.fire({
        icon: 'error',
        title: 'Validation Errors',
        html: `<ul style="list-style-type: none;">${errors}</ul>`,
        confirmButtonColor: '#d33',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    }
  }
}
