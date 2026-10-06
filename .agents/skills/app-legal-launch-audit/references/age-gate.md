# Age gate

Fail if a visitor can create an account, or submit profile details beyond the age check, without passing the product minimum.

Default minimum is 13 for a general consumer app that is not directed to children. Use 18 if the terms or product already require an adult. Do not lower the minimum to make signup easier.

## Pass

- The age check runs before account creation and before other profile, contact, or payment fields are stored.
- Under-minimum users cannot finish signup.
- A failed attempt does not keep a name, email, or other profile payload.
- The terms state the same minimum the gate enforces.
- The control is a date of birth or an equivalent age field, not only an unchecked "I am 13+" box buried in terms.

A bare checkbox can still be a temporary block for a general-audience app, but report it as a weak pass and prefer a date of birth.

## Stop

If the product is directed to children under 13, stop. A checkbox or age gate is not COPPA verifiable parental consent. Do not invent a parental-consent system in this skill.

## Fix

Put the gate on the first signup step. Disable the rest of the form until the date passes. Reject the same rule on the server. Keep the rejection copy short and do not ask the child for a parent email in this skill.
