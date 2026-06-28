# Introduction to Cyber Security

Cyber security is the practice of protecting systems, networks, and data from digital attacks — attacks that aim to access, change, or destroy sensitive information, extort money, or interrupt normal operations.

## The CIA triad

The foundation of almost every security control maps back to three goals:

- **Confidentiality** — only authorized people can see the data
- **Integrity** — data can't be modified undetected
- **Availability** — systems stay usable when they're needed

> If you can't explain which leg of the CIA triad a control protects, you probably don't understand the control yet.

## Common categories of threats

| Category | Example | Primary target |
|---|---|---|
| Malware | Ransomware, worms | Integrity / Availability |
| Social engineering | Phishing | Confidentiality |
| Network attacks | Man-in-the-middle | Confidentiality / Integrity |
| Denial of service | DDoS flood | Availability |

## A simple risk formula

```text
Risk = Threat × Vulnerability × Impact
```

Reducing any one factor to zero (in theory) reduces risk to zero — in practice you mitigate all three a little at a time.

## Topics in this section

- [ ] Firewalls and network perimeter defense
- [ ] Authentication and access control
- [ ] Cryptography fundamentals
- [ ] Incident response basics

---

Start with [Firewall](firewall.md) for the first concrete control.
