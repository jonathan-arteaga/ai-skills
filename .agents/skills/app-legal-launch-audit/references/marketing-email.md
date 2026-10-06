# Marketing email

Fail if any commercial or marketing email template can send without a working unsubscribe mechanism and a valid physical postal address.

This follows the FTC CAN-SPAM guide and 16 CFR 316.2(p). Transactional mail about an existing transaction is separate. Do not strip the marketing footer from a message that also promotes a product.

## Pass

- Every marketing template includes a clear unsubscribe link or other functioning opt-out.
- The opt-out does not require a fee, a login, or extra personal data beyond the address needed to honor it.
- The mechanism is honored within 10 business days and remains available for at least 30 days after send.
- The template includes a valid physical postal address: a street address, a USPS post office box, or a commercial mail receiving agency registered under the sender name.
- The footer is on the marketing template, not only on a sample preview.

## Fix

Add the footer to the shared marketing layout. Wire the link to the existing suppression list. If no suppression list exists, say so and stop before claiming the check passes. Do not send a live test to a real customer unless the user asks.
