# Syllabus :
## Unit 1 : 
Introduction to Software Engineering : Defining software, Software Application Domains, Software Engineering Layers, Software Myths. Process Models : The Waterfall Model, Incremental process model, Evolutionary Process Model - Prototyping and The Spiral model.
## Unit 2 :
Software Requirement: Functional and non-functional requirement, Software requirements document, requirements specification. Requirements Engineering Process: Requirements elicitation and analysis, requirements validation, Requirements management. System Models: Behavioral models, Object Models.
## Unit 3 :
Design Engineering: Design Concepts, Architectural Styles, Architectural Design. Modeling Component-level design: designing class –based components, conducting component-level design. User Interface Design: Golden rules, User interface analysis and design.
## Unit 4 :
Testing Strategies: A strategic approach to software testing, Validation testing, System testing. Testing Conventional Applications: White-Box Testing (Basis Path Testing), Black Box Testing (Equivalence Partitioning, Boundary Values Analysis).
## Unit 5 :
Risk management: Reactive vs. Proactive Risk strategies, software risks, Risk identification, Risk projection, Risk refinement, RMMM, RMMM plan. Software Quality Assurance: Software Reviews, Formal technical Reviews, Statistical Software quality Assurance, Software reliability.

---

# Unit I : Introduction

## **Defining Software**
"Software is a collection of computer programs, procedures, documentation, and related data that instruct a computer to perform specific tasks."

**Components of Software:**
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

**Characteristics of Software:**
- Developed, not manufactured.
- Does not wear out like hardware.
- Can be modified and updated.
- Performs specific tasks
- Mostly custom-built, through reusable components are increasingly used.
- Requires regular maintenance. 

---

## **Software Application Domains**
Refer to the various fields or are in which software is developed and used to perform specific tasks.

**Types of Software Application Domains :** 
1. System Software
    - Software that manages and control computer hardware and provide a platform for other software. 
    - Ex : Microsoft Windows, Linux, Compilers
2. Business/Application Software 
    - Software used to support business activities and operations.
    - Ex : Payroll System, Inventory Management Systems, Accounting Software 
3. Engineering & Scientific Software
    - Software used for scientific calculations, and engineering design.
    - Ex : CAD (Computer-Aided Design), Weather Forecasting Systems, Simulation Software 
4. Embedded Software
    - Software build into hardware devices to control their operation.
    - Ex : Washing Machine, Microwave Ovens, Automobile Control Systems
5. Web Application 
    - Software that runs on web servers and is accessed through web browsers.
    - Ex : Online Shopping Websites, Online Banking Systems, Social Networking Sites
6. Artificial Intelligence Software 
    - Software that mimics human intelligence and decision-making.
    - Ex : Expert Systems, Chatbots, Machine Learning Applications
7. Real-Time Software 
    - Software that monitors and responds to events within a specified time.
    - Ex : Air Traffic Control Systems, Medical Monitoring Systems
    

---

## Software Engineering Layers
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

Example : 
- IDEs ( Integrated )
- Testing Tools
- Version Control Tools

---

## Software Myths
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

# Unit II: Software Requirements

## Software Requirement :
A software requirement is a description of the functions, features, constraints, and quality attributes that a software system must satisfy. It specifies what the software should do and how it should perform.

Software requirements are mainly classified into:
1. Functional Requirements
2. Non-Functional Requirements

---

1. Functional Requirements
- Definition:
    Functional requirements describe what the software system should do. They specify the services, functions, and operations the system must perform.

- Characteristics: 
    - Describe system behavior.
    - Define inputs, outputs, and processing.
    - Based on user needs.

- Examples
    - User registration and login.
    - Online payment processing.
    - Generate reports.
    - Search for products.
    - Reset password.

---
2. Non-Functional Requirements
- Definition:
    Non-functional requirements describe how the software should perform. They specify the quality attributes and performance standards of the system.
- Types
    - Performance – Fast response time.
    - Security – Protect user data.
    - Reliability – System works without failure.
    - Usability – Easy to use.
    - Scalability – Can handle increased users.
    - Maintainability – Easy to modify and update.
- Examples
    - System should respond within 2 seconds.
    - Software should be available 24×7.
    - User passwords must be encrypted.
    - The system should support 10,000 users simultaneously.

---

3. Software Requirements Document (SRD) :
- Definition: 
    A Software Requirements Document (SRD) is a formal document that contains all the functional and non-functional requirements of the software system.

- Purpose
    - Acts as an agreement between the customer and the developer.
    - Guides software design, development, and testing.

- Contents of SRD
    - Introduction
    - Functional Requirements
    - Non-Functional Requirements
    - System Constraints
    - Assumptions
    - References

---
4. Software Requirements Specification (SRS)
- Definition:
    A Software Requirements Specification (SRS) is a detailed and structured document that describes all software requirements in a clear and precise manner.

- Characteristics of a Good SRS
    - Correct
    - Complete
    - Consistent
    - Verifiable
    - Modifiable
    - Traceable

- Importance
    - Helps developers understand requirements.
    - Reduces development errors.
    - Improves software quality.
    - Makes testing easier.

---

## Requirements Engineering Process

1. Requirements Elicitation and Analysis

Collect requirements from stakeholders through:

Interviews

Questionnaires

Observation

Workshops


2. Requirements Validation

Ensures requirements are correct and complete.

Methods:

Reviews

Prototyping

Test-case generation


3. Requirements Management

Managing changes in requirements throughout the project.


---

System Models

1. Behavioral Models

Describe system behavior.

Examples:

Use Case Diagram

State Diagram

Activity Diagram


2. Object Models

Represent objects and relationships.

Example:

Class Diagram



---

# Unit III: Design Engineering

Design Concepts

1. Abstraction


2. Refinement


3. Modularity


4. Information Hiding


5. Functional Independence


6. Architecture


7. Design Patterns




---

Architectural Styles

Data-Centered Architecture

Example: Database systems

Data Flow Architecture

Example: Compiler

Call-and-Return Architecture

Example: Main Program with Subroutines

Object-Oriented Architecture

Example: Java Applications

Layered Architecture

Example: Operating Systems


---

Architectural Design

Process of defining:

Components

Interfaces

Relationships


Goals:

Performance

Maintainability

Scalability



---

Modeling Component-Level Design

Designing Class-Based Components

Includes:

Attributes

Methods

Relationships


Example

Student Class

RollNo

Name

Marks


Methods:

addStudent()

displayStudent()



---

Conducting Component-Level Design

Steps:

1. Identify Components


2. Define Interfaces


3. Design Data Structures


4. Review Design




---

User Interface Design

Golden Rules

1. Place User in Control

Flexible interaction

Easy navigation


2. Reduce User Memory Load

Meaningful defaults

Simple screens


3. Make Interface Consistent

Uniform layout

Standard terminology



---

UI Analysis and Design

1. User Analysis


2. Task Analysis


3. Interface Design


4. Prototype Development


5. Evaluation




---

# Unit IV: Testing Strategies

Strategic Approach to Software Testing

Levels:

1. Unit Testing


2. Integration Testing


3. Validation Testing


4. System Testing




---

Validation Testing

Ensures software satisfies customer requirements.

Methods:

Acceptance Testing

Alpha Testing

Beta Testing



---

System Testing

Tests the complete integrated system.

Types:

Recovery Testing

Security Testing

Stress Testing

Performance Testing



---

White-Box Testing

Basis Path Testing

Tests all independent execution paths.

Steps

1. Draw Flow Graph


2. Calculate Cyclomatic Complexity



Formula:

V(G) = E - N + 2

Where:

E = Number of Edges

N = Number of Nodes



---

Black-Box Testing

1. Equivalence Partitioning

Divides input data into valid and invalid classes.

Example

Age Range: 18–60

Valid:

18–60


Invalid:

Below 18

Above 60



---

2. Boundary Value Analysis (BVA)

Tests boundary values.

For age 18–60:

Test Cases:

17

18

19

59

60

61



---

# Unit V: Risk Management

Reactive vs Proactive Risk Strategies

Reactive

Respond after risk occurs.


Proactive

Identify and mitigate risks before occurrence.



---

Software Risks

Project Risks

Schedule delay

Budget overrun


Technical Risks

New technology failure


Business Risks

Market changes



---

Risk Identification

Finding potential risks.

Methods:

Brainstorming

Checklists

Expert opinion



---

Risk Projection

Estimate:

Probability

Impact


Formula:

Risk Exposure = Probability × Loss


---

Risk Refinement

Breaking a general risk into detailed risks.

Example:

Staff turnover

Senior developer leaves

Team restructuring




---

RMMM (Risk Mitigation, Monitoring and Management)

Mitigation

Actions to reduce risk.

Monitoring

Track risk indicators.

Management

Contingency plans if risk occurs.


---

RMMM Plan

Contains:

Risk Description

Probability

Impact

Mitigation Strategy

Monitoring Activity

Contingency Plan



---

Software Quality Assurance (SQA)

Definition

Activities that ensure software quality throughout development.

Objectives

Improve quality

Reduce defects

Ensure standards compliance



---

Software Reviews

Systematic examination of software artifacts.

Benefits:

Early defect detection

Reduced development cost



---

Formal Technical Reviews (FTR)

Structured peer review process.

Steps

1. Preparation


2. Review Meeting


3. Rework


4. Follow-up




---

Statistical Software Quality Assurance

Uses statistical techniques to:

Measure defects

Analyze trends

Improve process quality



---

Software Reliability

Definition

Probability that software performs correctly for a specified time under specified conditions.

Reliability Metrics

Mean Time Between Failures (MTBF)

Mean Time To Failure (MTTF)

Mean Time To Repair (MTTR)


Formula:

MTBF = MTTF + MTTR

Importance

Increases user confidence

Reduces maintenance cost

Improves software quality



---

Exam Preparation Tip 🎯

For RCUB exams, focus on these frequently asked topics:

1. Waterfall Model


2. Spiral Model


3. Functional vs Non-Functional Requirements


4. SRS Characteristics


5. Architectural Styles


6. Golden Rules of UI Design


7. White Box vs Black Box Testing


8. Equivalence Partitioning & BVA


9. Risk Management Process


10. Software Reliability and SQA



These topics often appear as 5-mark and 10-mark questions.