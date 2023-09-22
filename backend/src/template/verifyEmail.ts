import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyEmailService {
  verifyTemplate(
    email: string,
    verificationLink: string,
    randomPassword: string,
  ): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
        .verify-img{
          width: 500px;
          height: auto;
        }

        .a6S{
          display: none;
        }

        .verify-link {
          text-decoration: none;
          margin-top: 5px;
        }
        </style>
      </head>
      <body>
        <div>
          <img class='verify-img' src="https://img.freepik.com/free-vector/man-sitting-desk-unlocking-computer-computer-settings-login-flat-illustration_74855-20645.jpg?w=826&t=st=1694168023~exp=1694168623~hmac=31101eb4fd17be988c4d9b3a93ae6430e534d8595339b9a7b0fbecf4b6410b90" alt="Verify Image" />
        </div>
        <div>
          <h2>Hello,</h2>
          <p>Your email address is: ${email}</p>
          <p>Your random password is: <strong>${randomPassword}</strong></p>
          <p>Please click the following link to verify your account &#128078; &#x1F44E;</strong></p>
            <a class="verify-link" href="${verificationLink}">Your verification Link</a>
        </div>
      </body>
    </html>
    `;
  }
}
