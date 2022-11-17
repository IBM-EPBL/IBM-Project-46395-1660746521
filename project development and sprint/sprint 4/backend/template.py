from cryptography.fernet import Fernet
from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient

# from address we pass to our Mail object, edit with your name
FROM_EMAIL = 'gokul6073@gmail.com'

# update to your dynamic template id from the UI
TEMPLATE_ID = 'd-4d87db5df1564451a65390ca17cbd056'

# list of emails and preheader names, update with yours
TO_EMAILS = []
key = b'HkGpGItfb4xVF0V686GBwBFBEnE8NGmCUVofmdaPeUg='
encMessage = b'gAAAAABjcMoPfi6lZDzbYfoEpYy3aglR1lMJ-LHGm_dsDU1-STViD8SwNxHN2BhQk36VA3_rzGfIZLIGiA8USKfOXCb1dbul1BXvnyKbMV0d90mrlV6F-LRHjnkHWY2XOMEHQ87FpP-bwiFK2Ibpw6NRys53ZAh-fYzZaHgDqu_OU_s922IOlQM='
fernet = Fernet(key)
API_KEY = fernet.decrypt(encMessage).decode()
def SendDynamic(email):
    """ Send a dynamic email to a list of email addresses

    :returns API response code
    :raises Exception e: raises an exception """
    # create Mail object and populate
    emailId = (email)
    TO_EMAILS.append(emailId)
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=TO_EMAILS)
    # pass custom values for our HTML placeholders
    message.dynamic_template_data = {
        'subject': 'Expense Limit Exceed Alert',
        # 'place': 'New York City',
        # 'event': 'Twilio Signal'
    }
    message.template_id = TEMPLATE_ID
    # create our sendgrid client object, pass it our key, then send and return our response objects
    try:
        sg = SendGridAPIClient(API_KEY)
        global response
        response = sg.send(message)
        
        code, body, headers = response.status_code, response.body, response.headers
        print(f"Response code: {code}")
        print(f"Response headers: {headers}")
        print(f"Response body: {body}")
        print("Dynamic Messages Sent!")
    except Exception as e:
        print("Error: {0}".format(e))
    return str(response.status_code)

if __name__ == "__main__":
    SendDynamic()
