export function generateOtp(){
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f7fb;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #f4f7fb; padding: 40px 15px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="
            max-width: 500px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          ">

          <!-- Header -->
          <tr>
            <td align="center"
              style="
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                padding: 30px 20px;
              ">

              <div style="
                width: 60px;
                height: 60px;
                line-height: 60px;
                margin: 0 auto 15px;
                background-color: rgba(255,255,255,0.15);
                border-radius: 50%;
                color: #ffffff;
                font-size: 28px;
              ">
                🔐
              </div>

              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 26px;
                font-weight: 700;
              ">
                Verification Code
              </h1>

              <p style="
                margin: 10px 0 0;
                color: #e0e7ff;
                font-size: 14px;
              ">
                Secure verification for your account
              </p>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 30px;">

              <p style="
                margin: 0 0 15px;
                font-size: 16px;
                line-height: 1.6;
              ">
                Hello,
              </p>

              <p style="
                margin: 0 0 25px;
                font-size: 15px;
                line-height: 1.6;
                color: #4b5563;
              ">
                Use the verification code below to complete your
                sign-in or verification process.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center"
                    style="
                      background-color: #f3f4ff;
                      border: 2px dashed #6366f1;
                      border-radius: 12px;
                      padding: 25px 15px;
                    ">

                    <p style="
                      margin: 0 0 8px;
                      color: #6b7280;
                      font-size: 12px;
                      text-transform: uppercase;
                      letter-spacing: 2px;
                      font-weight: 600;
                    ">
                      Your OTP
                    </p>

                    <div style="
                      color: #4f46e5;
                      font-size: 36px;
                      font-weight: 800;
                      letter-spacing: 8px;
                    ">
                      ${otp}
                    </div>

                  </td>
                </tr>
              </table>

              <!-- Expiry -->
              <p style="
                margin: 25px 0 0;
                text-align: center;
                font-size: 14px;
                color: #6b7280;
              ">
                ⏱️ This code will expire in
                <strong style="color: #374151;">10 minutes</strong>.
              </p>

              <!-- Security Notice -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="margin-top: 25px;">
                <tr>
                  <td style="
                    background-color: #fff7ed;
                    border-left: 4px solid #f97316;
                    padding: 14px 16px;
                    border-radius: 6px;
                  ">
                    <p style="
                      margin: 0;
                      font-size: 13px;
                      line-height: 1.6;
                      color: #9a3412;
                    ">
                      <strong>Security notice:</strong><br>
                      Never share this code with anyone.
                      Our team will never ask you for your OTP.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="
                margin: 30px 0 0;
                font-size: 14px;
                line-height: 1.6;
                color: #6b7280;
                text-align: center;
              ">
                If you didn't request this code, you can safely
                ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background-color: #f9fafb;
              padding: 20px 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            ">

              <p style="
                margin: 0;
                font-size: 12px;
                color: #9ca3af;
              ">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>

              <p style="
                margin: 8px 0 0;
                font-size: 12px;
                color: #9ca3af;
              ">
                This is an automated email. Please do not reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}
