# Unit I : Introduction

## **Defining Software**
"Software is a collection of computer programs, procedures, documentation, and related data that instruct a computer to perform specific tasks."

### Components of Software
1. Programs (source code)
    - A set of instructions that tells the computer what to do.
    - Written using programming languages such as C, Java, or Python.
2. Data Structures 
     - Data that is stored and processed by the software.
     - Helps organize information efficiently.
3. Documentation
     - Manuals, user guides, installation guides, and technical documents.
     - Helps users and developers understand, operate, and maintain the software.

**Example of Software :**
- System Software e.g. Microsoft Windows, Linux , Android etc.
- Application Software e.g. Google Chrome, Microsoft Word etc.

### Characteristics of Software
- Developed, not manufactured.
- Does not wear out like hardware.
- Can be modified and updated.
- Performs specific tasks
- Mostly custom-built, through reusable components are increasingly used.
- Requires regular maintenance. 

---
### Software Engineering 
Software engineering is application of engineering principals to design, build, test, deploy, and maintain the software.

#### Software Engineering Process
- Requirement Gathering – Collect and analyze user needs.
- System Design – Create the architecture and design of the software.
- Implementation (Coding) – Write the program according to the design.
- Testing – Find and fix errors to ensure the software works correctly.
- Deployment – Release the software for users.
- Maintenance – Update, improve, and fix the software after deployment.
---
### Software Application Domains
Software application domains are specific industry fields, technological areas where software is utilised to solve problem.

Software application domains are classified into:
1. Broad Technical Domain
2. Industry-Specific Domain

**Types of Software Application Domains :** 
1. Broad Technical Domain
    These are general-purpose software categories used across multiple industries.

    A. System & Utility Software
    - System and utility software manage, maintain, and improve the performance of a computer system.
    - ex : Windows Operating System, Antivirus Software, Disk Cleanup, Backup Software.

    B. Embedded & Real-Time Software
    - Embedded software is built into hardware devices, while real-time software responds to events within a fixed time limit.
    - ex : ATM Machine, Car Airbag System, Smart Watch, Microwave Oven, Traffic Signal Controller, File Compression (7-Zip).

    C. Scientific & Engineering Software
    - Software used for scientific research, engineering design, simulations, and complex mathematical calculations.
    - ex : MATLAB, AutoCAD, ANSYS, SPSS

    D. AI & Data-Driven Software
    - Software that uses Artificial Intelligence (AI) and Data Analytics to learn from data and make intelligent decisions.
    - ex : ChatGPT, Google Assistant, Netflix Recommendation System, Face Recognition, Self-driving Cars.
---

2. Industry-Specific Domain
    These are software applications developed for a particular industry.
    
    A. Business Software
    - Software used to manage business operations and improve productivity.
    - ex : ERP, CRM, Payroll System, Inventory Management, Billing Software

    B. Medical & Healthcare Software
    - Software used in hospitals and healthcare organizations to manage patients and medical services.
    - Hospital Management System, Electronic Health Records (EHR), Telemedicine Apps, Appointment Booking System

    C. Finance Software
    - Software used for banking, accounting, investments, and financial transactions.
    - ex : Internet Banking, Google Pay, PhonePe, Tally, Stock Trading Apps

    D. Social Media Software
    - Software that enables people to communicate, share content, and connect online.
    - ex : WhatsApp, Instagram, Facebook, X (Twitter), LinkedIn
---

### Software Engineering Layers
Software Engineering Layers provide a structured framework for software development.

**Diagram** 
```
+---------------+
|     Tools     |
+---------------+
|    Methods    |
+---------------+
|    Process    |
+---------------+
| Quality Focus |
+---------------+
```

1. Quality Focus (Foundation Layer)
    - It is the foundation of software engineering.
    - Emphasizes continuous improvement in software quality.
    - Ensures that the software meets customer requirements and standards.
2. Process Layer
    - Acts as the framework for software development.
    - Define activities, tasks, and milestones.
    - Helps manage and control software projects effectively.
3. Methods Layer
    -  Provides technical procedure for building software.
    - Includes requirements analysis, design, coding, testing, and maintenance.
    - Specifies how software should be developed.
4. Tools Layer
    -  Provides automated or semi-automated support for the process and methods.
    - Helps improve productivity and accuracy.
    - Example : 
          - IDEs ( Integrated )
          - Testing Tools
          - Version Control Tools

---

### Software Myths
Software Myths are false beliefs or misconceptions about software development that can lead to unrealistic expectations, poor decisions, and project failures.

1. **Customer Myths**
- Misconceptions held by customers or users.
- Examples:
    - Myth: A general statement of objectives is enough to start development.
        - Reality: Detailed requirements are necessary.
    - Myth: Changes can be made easily at any time.
        - Reality: Requirement changes often increase cost and development time.

1. **Management Myths**
- Misconceptions held by managers.
- Examples:
    - Myth: Existing standards and procedures are sufficient to develop software.
        - Reality: Effective management and continuous monitoring are also required.
     - Myth: If a project is behind schedule, adding more programmers will speed it up.
        - Reality: New team members require training and coordination, which may further delay the project.
2. Practitioner (Developer) Myths
- Misconceptions held by software developers.
- Examples:
    - Myth: Once the program works, the job is finished.
        - Reality: Maintenance, testing, and documentation are still required.
    - Myth: Software quality can only be assessed after execution.
        - Reality: Quality can be evaluated during requirements, design, coding, and testing phases.

 **Effects of Software Myths : **
- Unrealistic expectations
- Project delays
- Increased development costs
- Poor software quality
- Communication problems
- More programmers can solve schedule delays.
---

## Process Models
A Process Model is a structured approach used to develop software. It defines the sequence of activities involved in software development.
### Waterfall Model : 
The Waterfall Model is a linear and sequential software development model where each phase must be completed before the next phase begins

**Diagram :** 
```
Requirements Analysis
        ↓
System Design
        ↓
Implementation (Coding)
        ↓
Testing
        ↓
Deployment
        ↓
Maintenance
```

Phases of Waterfall Model
1. Requirements Analysis
    - Gather customer requirements.
    - Understand system needs.
    - Prepare Software Requirement Specification (SRS).

2. System Design
    - Design system architecture.
    - Design database and user interface.
    - Select hardware and software requirements.

3. Implementation (Coding)
    - Convert design into source code.
    - Develop different software modules.
    - Perform unit testing.

4. Testing
    - Test the complete software.
    - Identify and fix bugs.
    - Ensure software meets requirements.

5. Deployment
    - Install software at the customer's location.
    - Make the software available to users.
    - Provide user training if required.

6. Maintenance
    - Fix bugs after deployment.
    - Improve software performance.
    - Add new features according to customer need.

Advantages : 
- Simple and easy to understand.
- Easy to manage.
- Well-documented process.
- Suitable for projects with fixed requirements.
- Easy to track project progress.

Disadvantages :
- Difficult to accommodate changes.
- Testing is performed late.
- Customer involvement is very limited.
- High risk if requirements are incorrect.
- Not suitable for large and complex projects.

Applications :
- Small projects with clear requirements.
- Government and banking systems.
- Banking systems with stable requirements.
- Academic projects.
---

### Incremental Process Model :
The Incremental Model develops software in small parts called increments. Each increment adds new functionality to the system.

Instead of delivering the entire software at once, it is delivered in multiple releases.

**Diagram :**
```
Requirements
      ↓
Increment 1 → Basic System
      ↓
Increment 2 → Additional Features
      ↓
Increment 3 → Final System
```

**Working of Incremental Model :**
- Gather complete requirements.
- Divide the project into small increments.
- Develop the first increment.
- Deliver it to the customer.
- Collect customer feedback.
- Develop the next increment.
- Continue until the complete software is finished

Advantages :
- Early delivery of working software.
- Easy to test and debug each increment.
- Customer can provide feedback after each release.
- Requirement changes can be accommodated easily.
- Faster delivery of important features.

Disadvantages
- Requires careful planning.
- Integration can be difficult.
- Not suitable if modules cannot be separated properly.
- Overall system architecture must be well designed.

Applications
- Web applications.
- Banking Software
- Online Shopping Websites
- Hospital Management Systems
- ERP Systems
- Mobile Applications

---

### Evolutionary Process Models :
Evolutionary models develop software through repeated cycles and continuous improvement.

It is mainly used when requirements are not clearly understood.

A) Prototyping Model
A Prototype is an initial working model of the software built to understand user requirements.

Steps in Prototyping Model :
```
Requirements Gathering
          ↓
Quick Design
          ↓
Build Prototype
          ↓
Customer Evaluation
          ↓
Refinement
          ↓
Final Product Development
```

Advantages : 
- Better understanding of requirements.
- Increased customer involvement.
- Reduces requirement errors.

Disadvantages :
- Users may think the prototype is the final product.
- Excessive changes may increase cost.

Applications
- Systems with unclear requirements.
- User-interface-intensive applications.

**B) Spiral Model :**
The Spiral Model combines iterative development with risk analysis. It is represented as a spiral with repeated cycles.

Phases of Spiral Model
```
Planning
    ↓
Risk Analysis
    ↓
Engineering
    ↓
Customer Evaluation
    ↓
Next Spiral Cycle
```

Advantages
- Excellent risk management.
- Suitable for large and complex projects.
- Flexible to changing requirements.

Disadvantages
- Expensive.
- Complex to manage.
- Requires risk analysis expertise.

Applications
- Large-scale projects.
- Mission-critical systems.

---

### Difference between Waterfall & Incremental 

| Waterfall                        | Incremental                             |
| -------------------------------- | --------------------------------------- |
| Linear development               | Development in small increments         |
| Software delivered once          | Software delivered in multiple releases |
| Difficult to change requirements | Easy to change requirements             |
| Customer involvement is low      | Customer involvement is high            |
| Testing after coding             | Testing in every increment              |
| Suitable for small projects      | Suitable for medium and large projects  |

---
Back to : [[SE Syllabus]]

---
Go to next : [[Unit 2 - Software Requirement]]