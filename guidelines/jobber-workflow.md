# Jobber Workflow Rules

Use the Jobber workflow model as the source of truth for object lifecycle, status, actions, transitions, and UI/state behavior.

Do not invent alternate workflow states, status names, or object transitions unless explicitly requested.

When generating UI, product logic, copy, or flows:

- preserve the defined object lifecycle
- use the defined state names
- use actions that are valid for the current state
- respect object and sub-object relationships
- do not collapse distinct concepts into one status unless explicitly defined that way

If a workflow detail is ambiguous, preserve the ambiguity as a known product question instead of silently normalizing it.

---

# Core Workflow Rule

For every workflow-based feature or UI:

1. Identify the object
2. Identify the current state
3. Show only content relevant to that object/state
4. Offer only actions valid for that object/state
5. Respect downstream effects of conversions and completions
6. Preserve state-specific terminology

Do not assume every object follows the same lifecycle.
Requests, Quotes, Jobs, Visits, and Invoices each have distinct workflows.

---

# General Modeling Rules

## Objects

Canonical workflow objects:

- Request
- Quote
- Job
- Visit
- Invoice

## Sub-object rule

- Visits are a sub-object of Jobs
- Job status and Visit status are related but not identical
- Do not assume a visit state automatically changes the job state unless explicitly defined

## Action rule

- Actions must be state-aware
- Do not show actions that are invalid for the current state
- Do not imply that all conversions are always available unless defined for that state

## Date/time rule

- Some time-based statuses are date-based
- Some time-based statuses are hour/time-based
- Preserve these distinctions

## Status rule

- Use exact workflow status names unless product language is intentionally being changed
- Do not replace defined workflow statuses with generic labels like "active" or "pending"

## Archive rule

- Archived is a distinct state, not a synonym for completed, closed, or converted
- Reopen and Unarchive should not be treated as interchangeable unless explicitly standardized

---

# Request Workflow

## Object

Request

## States

- New
- Unscheduled
- Assessment completed
- Today
- Upcoming
- Late
- Converted
- Archived

## State Definitions and Actions

### New

Definition:

- a request has been received externally by a new or existing client and does not have an assessment scheduled
- a request has been created by an SP and does not have an assessment scheduled

Object content:

- Created [Date]

Actions:

- Schedule assessment
- Convert to quote
- Convert to job
- Archive
- Delete

### Unscheduled

Definition:

- a request was created by an SP and "Schedule later" was selected for the assessment

Object content:

- Created [Date]

Actions:

- Schedule assessment
- Convert to quote
- Convert to job
- Archive
- Delete

### Assessment completed

Definition:

- the request had an assessment scheduled and it has been marked complete

Object content:

- Created [Date]
- Completed [Date]

Actions:

- Convert to quote
- Convert to job
- Archive
- Delete

### Today

Definition:

- the request has an assessment scheduled for today

Object content:

- Created [Date]
- Scheduled assessment [Date]

Actions:

- Complete Assessment
- Convert to quote
- Convert to job
- Archive
- Delete

### Upcoming

Definition:

- there is a site assessment scheduled and it is after the current end of day

Object content:

- Created [Date]
- Scheduled assessment [Date]

Actions:

- Complete Assessment
- Convert to quote
- Convert to job
- Archive
- Delete

### Late

Definition:

- the request has an assessment scheduled, the day/time has passed, and it has not been marked completed
- "Late" for a request assessment is defined on a daily date basis

Object content:

- Created [Date]
- Scheduled assessment [Date]

Actions:

- Complete Assessment
- Convert to quote
- Convert to job
- Archive
- Delete

### Converted

Definition:

- the request has been converted to a quote or a job

Object content:

- Created [Date]
- Converted [Date]

Actions:

- Convert to quote
- Convert to job
- Archive
- Delete

### Archived

Definition:

- the request was archived

Object content:

- Created [Date]
- Archived [Date]

Actions:

- Convert to quote
- Convert to job
- Unarchive
- Delete

## Request Rules

- New and Unscheduled are distinct states and should not be merged without intent
- Time-based request states relate to scheduled assessments
- Request "Late" is date-based, not hour-based
- Converted means the request has already been converted to a quote or job
- Archived requests may still expose conversion actions as defined

---

# Quote Workflow

## Object

Quote

## States

- Draft
- Awaiting response
- Changes requested
- Approved
- Converted
- Archived

## State Definitions and Actions

### Draft

Definition:

- the quote has been converted from a request or is newly created

Object content:

- Created [Date]
- Sent [Not yet]

Actions:

- Approve & Schedule
- Review & Send
- Approve
- Archive
- Delete

### Awaiting response

Definition:

- the quote has been sent to the SC
- the SC has neither approved the quote nor requested changes via client hub

Object content:

- Created [Date]
- Sent [Date]

Actions:

- Approve & Schedule
- Resend
- Approve
- Archive
- Delete

### Changes requested

Definition:

- the quote has been sent to the SC
- the SC has submitted a change request form via client hub

Object content:

- Created [Date]
- Changes requested [Date]

Actions:

- Approve & Schedule
- Resend
- Approve
- Archive
- Delete

### Approved

Definition:

- the quote has been approved by the SC via client hub
- the quote has been approved verbally by the SC and the SP has marked the quote approved manually

Object content:

- Created [Date]
- Changes requested [Date]

Actions:

- Schedule job
- Resend
- Collect signature
- Archive
- Delete

### Converted

Definition:

- the quote has been scheduled or unscheduled as a job

Object content:

- Created [Date]
- Converted [Date]

Actions:

- Schedule job
- Resend
- Collect signature
- Archive
- Delete

### Archived

Definition:

- the quote was archived

Object content:

- Created [Date]
- Archived [Date]

Actions:

- Approve & Schedule
- Resend
- Approve
- Unarchive
- Delete

## Quote Rules

- Draft is an unsent quote state
- Awaiting response and Changes requested are both sent states with distinct client response conditions
- Approved is distinct from Converted
- Converted means the quote has become a job, including unscheduled job creation
- Preserve the distinction between review/send, approve, and approve-and-schedule
- Keep open product questions visible where archive/unarchive behavior is uncertain

---

# Job Workflow

## Object

Job

## States

- Unscheduled
- Today
- Upcoming
- Late
- Action required
- Requires invoicing
- Ending in 30 days
- Archived

## State Definitions and Actions

### Unscheduled

Definition:

- a job has been created but there are no scheduled visits
- job status is dependent on how visits are scheduled

Object content:

- Address [Property address]
- This job has not been scheduled

Actions:

- Go to visits
- Close job
- Generate invoice
- Collect signature
- Delete job

Notes:

- "Schedule visit" may conceptually belong here, but may be disorienting if unavailable directly at the job level and instead routes to visit scheduling

### Today

Definition:

- there is a job visit scheduled for today

Object content:

- Address [Property address]
- Schedule starts [Date]

Actions:

- Go to visits
- Close job
- Generate invoice
- Collect signature
- Delete job

### Upcoming

Definition:

- there is a job visit scheduled and it is after the current end of day

Object content:

- Address [Property address]
- Schedule starts [Date]

Actions:

- Go to visits
- Close job
- Generate invoice
- Collect signature
- Delete job

### Late

Definition:

- late status differs between jobs and visits
- "Late" for a job is defined on a daily date basis
- "Late" for a visit is defined on an hourly time basis
- this means there can be a late visit while the job still reflects Today
- late status overrides other time-based statuses
- there is a job visit scheduled for yesterday or any past date

Object content:

- Address [Property address]
- Schedule starts [Date]

Actions:

- Go to visits
- Close job
- Generate invoice
- Collect signature
- Delete job

### Action required

Definition:

- all visits have been completed and the job has been left open

Object content:

- Address [Property address]
- Schedule starts [Date]

Actions:

- Close job
- Generate invoice
- Go to visits
- Collect signature
- Delete job

Notes:

- wording may need standardization across Close job, Complete job, and Archive

### Requires invoicing

Definition:

- the job has been closed

Object content:

- Address [Property address]
- Schedule starts [Date]

Actions:

- Generate invoice
- Collect signature
- Reopen job
- Delete job

Notes:

- a known workflow edge case exists if a new visit is added after closing and the status still remains Requires invoicing

### Ending in 30 days

Definition:

- not technically a status in the workflow
- considered a flag to help SPs get in contact with the SC and win more business

Actions:

- manually reach out to SP to reschedule work

### Archived

Definition:

- the job was archived

Object content:

- Created [Date]
- Archived [Date]

Actions:

- Reopen job
- Generate invoice
- Collect signature
- Delete job

Notes:

- if a completed visit is reopened, expectation may be that the job automatically reopens, but current behavior may differ

## Job Rules

- Job state depends on visits but is not identical to visit state
- Unscheduled jobs are jobs with no scheduled visits
- Late job logic is daily/date-based
- Action required is a distinct post-visit, pre-invoicing state
- Requires invoicing is distinct from Archived
- Ending in 30 days is a flag, not a canonical workflow status
- Reopen job and Unarchive should not be assumed to mean the same thing unless standardized
- Do not silently resolve known product terminology questions

---

# Visit Workflow

## Object

Visit

## Parent object

Job

## States

- Unscheduled
- Today
- Upcoming
- Late
- Completed

## State Definitions and Actions

### Unscheduled

Definition:

- a job has been created but there are no scheduled visits

Object content:

- Address [Property address]
- Schedule [Unscheduled]

Actions:

- Schedule visit
- Start timer
- Complete visit
- Get directions
- Send on my way message
- Schedule new visit
- Delete

### Today

Definition:

- there is a job visit scheduled for today

Object content:

- Address [Property address]
- Schedule [Date]

Actions:

- Start timer
- Complete visit
- Get directions
- Send on my way message
- Schedule new visit
- Delete

Notes:

- reschedule may be a useful action but is not currently canonical in this definition

### Upcoming

Definition:

- there is a job visit scheduled and it is after the current end of day

Object content:

- Address [Property address]
- Schedule [Date]

Actions:

- Start timer
- Complete visit
- Get directions
- Send on my way message
- Schedule new visit
- Delete

### Late

Definition:

- late status differs between jobs and visits
- "Late" for a visit is defined on an hourly time basis
- "Late" for a job is defined on a daily date basis
- this means there can be a late visit while the job still reflects Today
- late status overrides other time-based statuses
- there is a job visit scheduled for the last hour or any past hour

Object content:

- Address [Property address]
- Schedule [Date]

Actions:

- Start timer
- Complete visit
- Get directions
- Send on my way message
- Schedule new visit
- Delete

### Completed

Definition:

- the visit has been completed and the job has been left open

Object content:

- Address [Property address]
- Schedule [Date]

Actions:

- Start timer
- Completed
- Get directions
- Send on my way message
- Schedule new visit
- Delete

## Visit Rules

- Visits are sub-objects of Jobs
- Visit late logic is hourly/time-based
- Visit status does not automatically equal Job status
- A late visit may coexist with a job still shown as Today
- Completed visit does not automatically mean completed or closed job

---

# Invoice Workflow

## Object

Invoice

## States

- Draft
- Awaiting payment
- Past due
- Paid
- Bad debt
- Void

## State Definitions and Actions

### Draft

Definition:

- the invoice has been converted from a job or visit, or newly created, and has not been sent

Object content:

- Issued [Not sent yet]
- Due [Net #]

Actions:

- Review & Send
- Collect payment
- Collect signature
- Delete invoice

### Awaiting payment

Definition:

- the invoice has been sent to the SC
- the SC may have made a payment, but there is still an outstanding balance

Object content:

- Issued [Date]
- Due [Net #]

Actions:

- Resend
- Collect payment
- Collect signature
- Delete invoice

### Past due

Definition:

- the due date for the invoice has passed without full payment of the balance

Object content:

- Issued [Date]
- Due [Net #]

Actions:

- Resend
- Collect payment
- Collect signature
- Delete invoice

### Paid

Definition:

- full balance of the invoice has been paid or collected

Object content:

- Issued [Date]
- Due [Net #]

Actions:

- Resend
- Collect signature
- Delete invoice

### Bad debt

Definition:

- the invoice has a payment that has been marked as Bad Debt in JO
- this sets the client balance to $0

Object content:

- Address [Property address]
- Schedule [Date]

Actions:

- Collect signature
- Delete invoice

### Void

Definition:

- TBD

## Invoice Rules

- Draft is an unsent invoice state
- Awaiting payment and Past due both represent unpaid balance, with Past due based on due date passing
- Paid requires full balance paid
- Bad debt is a distinct terminal-like financial state and should not be treated as Paid
- Void exists as a state but is not yet fully defined

---

# Cross-Object Conversion Rules

## Request conversions

A Request may convert to:

- Quote
- Job

## Quote conversions

A Quote may convert to:

- Job

## Job to invoice creation

A Job may generate:

- Invoice

## Visit to invoice creation

A Visit may generate:

- Invoice

## Conversion Rules

- Converted is not a universal state with identical meaning across objects
- For Requests, Converted means converted to Quote or Job
- For Quotes, Converted means scheduled or unscheduled as a Job
- Preserve the target object when describing conversion outcomes

---

# Time-Based Status Rules

Use the correct level of time precision.

## Request

- Late is date-based/daily

## Job

- Late is date-based/daily

## Visit

- Late is time-based/hourly

## Time Precedence

- Late overrides other time-based statuses where defined
- Do not assume identical late logic across objects

---

# Terminology Guardrails

Use canonical workflow labels unless intentionally changing product language.

Prefer:

- New
- Unscheduled
- Assessment completed
- Today
- Upcoming
- Late
- Converted
- Archived
- Draft
- Awaiting response
- Changes requested
- Approved
- Action required
- Requires invoicing
- Completed
- Awaiting payment
- Past due
- Paid
- Bad debt
- Void

Do not replace these with vague equivalents like:

- Pending
- Open
- Active
- Done
- Finished
- In progress

unless there is an explicit product decision to rename them.

---

# Known Ambiguities and Product Questions

Preserve these as open questions rather than silently resolving them:

- Should Quote Archived support unarchive without requiring approval?
- Should "Close job" be standardized to "Complete job" or "Archive"?
- Is Close job meaningfully different from Archive?
- Should both Complete and Archive exist for Jobs?
- Should Requires invoicing change if a new visit is added after closing?
- Should Reopen job and Unarchive be standardized to one term?
- Should reopening a completed visit automatically reopen the parent job?
- Should Visit Today expose Reschedule as a canonical action?
- Void invoice state is not yet fully defined

When generating product thinking or UX:

- do not erase these open questions
- do not assume standardization where none exists
- highlight the ambiguity if the design depends on it

---

# Required Behavior

When generating UI, logic, or workflow documentation:

- identify the object first
- identify the exact state second
- use only valid actions for that state
- preserve conversion semantics
- preserve date-based versus time-based logic
- respect Job versus Visit differences
- preserve archived, converted, completed, and closed as distinct concepts unless explicitly standardized
- avoid invented lifecycle states