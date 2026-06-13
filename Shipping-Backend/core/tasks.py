# pyrefly: ignore [missing-import]
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_contact_email_task(name, email, company, service, message):
    subject = f"New Contact Request from {name} ({company or 'No Company'})"
    body = f"""
    You have received a new contact message:

    Name: {name}
    Email: {email}
    Company: {company or 'N/A'}
    Service of Interest: {service or 'N/A'}

    Message:
    {message}
    """
    recipient_list = [settings.SUPPORT_EMAIL]
    
    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=recipient_list,
        fail_silently=False,
    )
