import { Document } from '@Core/models/document.model';
import {
  beside,
  callout,
  header,
  image,
  linkCard,
  meetings,
  process,
  row,
  seedSection,
  table,
  tableOfContents,
  text,
  unsupported,
} from './seed-builder';

/*
 * “Organizational Design Guide” v1.5 (Schuberg Philis, 28-01-2025, internal) as a seed Document.
 * Text is copied verbatim from the PDF, with its typed heading numbers turned into Heading
 * levels. Images are the PDF's own, under public/assets/seeds/sbp-odg/. Links whose target
 * the PDF doesn't contain have an empty URL. Generated; see docs/specs/widget-catalogue.md §8.
 */
export const SBP_ORGANIZATIONAL_DESIGN_GUIDE: Document = {
  id: 'sbp-organizational-design-guide',
  title: 'Organizational Design Guide',
  updatedAt: '2025-01-28T09:00:00.000Z',
  sections: [
    seedSection('sbp-odg-s0', 'Organizational Design Guide', false, [
      // Schuberg Philis logo (cover page).
      image('/assets/seeds/sbp-odg/logo.png', '', 0.271, { columns: 3 }),
      header('Organizational Design Guide', 1, false),
      text('For Schuberg Philis'),
      unsupported(
        'Document properties',
        'Date: 28-01-2025',
        'Version: 1.5',
        'Author: Gerwin Schuring and others',
        'Status: Internal',
        '(The PDF also repeats Date, Author, Version and page “n/59” in every page header.)',
      ),
      tableOfContents('Contents', 3, 127),
      header('About this document', 1, false),
      text(
        'Welcome to this document. As a way of explaining what this document describes, and how to place it in the broader context of Schuberg Philis, please look at the below diagram:',
      ),
      // How the source documents relate (page 3): ① SBP Narrative (video: “Why we are here”), ② Purpose:
      // Tech For Good · Vision: Engineering Business Progress · Mission: Impacting vital industries for
      // the better, ③ Culture & DNA Document (Who we are), ④ Organizational Design Guide (How we are
      // organized), ⑤ Value Proposition Framework (What we do), ⑥ Strategy 2030 (Where we are going to)
      // with five Bold Moves: Expand and scale our services and enter new markets · Reinvent our
      // legendary culture · Pioneer business transformations with our customers · Lead our industry in
      // sustainability and responsibility · Unleash the power of automation and AI in the way we work
      // and live.
      image('/assets/seeds/sbp-odg/source-documents.jpg', 'How our source documents relate', 0.503),
      text(
        "These documents together describe Schuberg Philis to a large degree. All these documents are change controlled by the Council and changes will be communicated to the whole company. In other words: you will always be up to date on the structure of the company if you keep an eye on these documents. From top to bottom you can say that these documents will change very little, like the 1. Schuberg Philis Narrative, only once in 20 years, to a bit more frequent: 6. Strategy (once in 2-3 years).\n1. Schuberg Philis Narrative. It describes the essence of who we are and why we are here.\n2. Purpose, Vision and Mission. This is how we want to change our world and have an impact.\n3. Culture and DNA Document. This describes our culture in a structured way. It orders all aspects of our culture along a tree form with two main branches: (how to create a) Happy Customer and Happy Team.\n4. Organizational Design Guide. This guide not only describes the Organizational Design as it is, but also the underlying design principles for changing it in the future. You are currently in this document.\n5. Value Proposition Framework. This describes at a fundamental level what we want to do for our Customers and why. It gives guidance on what services we think are good for both Schuberg Philis and our Customers. And its structures these services in a tree.\n6. Strategy 2030 & Bold Moves 1-5. For our 2030 strategy, we've looked how to navigate shifting customer demands and new technologies, and what we need to do to have even more critical impact on our customers. In our Bold moves we make concrete steps towards that change.\n7. What you will see is that below this “Source Content” there are numerous “Working Documents” that will be more detailed and that will change more often than these sources. These are therefore also less strictly change-controlled, depending on the subject and context.",
      ),
      // Full-page version of the same diagram (page 4), split into “Source content” (①–⑤) and “Work
      // documents & Applications” ⑦: under the Culture & DNA Document: Code of Conduct, WFH policy, …;
      // under the Organizational Design Guide: Leadership, Sales & Com guides, Governance Finance, Team
      // planner; under the Value Proposition Framework: Value Propositions, SBP Solutions, Security Arc,
      // …
      image(
        '/assets/seeds/sbp-odg/source-and-work-documents.png',
        'Source content and work documents',
        0.717,
      ),
    ]),
    seedSection('sbp-odg-s1', 'The Schuberg Philis Organization', true, [
      // Organisation chart of Schuberg Philis as a whole (page 5). On top the Schuberg Philis Council ⑥:
      // Board with Bridgepoint (GPD); Gerwin Schuring, Founder, Chairman/CEO; Philip Dries, Founder,
      // Chief People Officer; David Dijkhuis, CFO; Erik-Jan Kool, MD, CCO; Mark van ’t Kruijs, MD,
      // Quality & Risk; Jeroen Borst, MD, COO; Tom den Hartog, MD; Arjan Eriks, MD, Vice Chairman;
      // Arthur van Schendel, MD; José Brenninkmeijer, MD; Gert de Jong, MD; Willem Jan van den Brekel,
      // Services Director; Ilja Heitlager, Chief Innovation Officer; Leo Simons, CTO; Ivo Roefs, CMO.
      // Below it seven columns, each linked to its Council members: GCT AM ② (Achmea, APG, BNPP NL, BNPP
      // USA, CCV Group, Geldmaat, MN); GCT FS ② (Argenta, DNB, Edge Sec, ING, PVH, Rabobank, Volksbank);
      // GCT PUR ② (ACT, Enexis, Heineken, Jumbo, KLM, NS, Versuni); GCT RTM ② (CB, Havenbedrijf,
      // Loodswezen, Min Fin, NewCold, PostNL, Vanderlande, ZLM); Services ③ (Backbone, SaaS, Cloud,
      // Trust, Workplace); Labs ④ (Academic Partners, CTO Office, Incubator, Labs); Central ⑤
      // (Assistants, Facility, Finance, Marketing, People, Recruitment, Restaurant). Every customer has
      // a ① Customer Team badge. The whole chart is framed as the Bi-Monthly Meeting ⑦.
      image('/assets/seeds/sbp-odg/organisation.png', 'Schuberg Philis as a whole', 0.451),
      text(
        '1. Customer Teams are the heart and at the core of Schuberg Philis. They are organized around a customer. This team takes care of the whole journey together with the Customer and it is responsible for 100% Customer satisfaction. See Section 1.1.\n2. Greater Customer Teams (GCT) are a collection of multiple customer teams organized historically around a market and now also around a location (Rotterdam). A GCT is a secondary homebase, besides the Customer team and acts as a “family” of 50-100 people in which you can feel at home. See Section 1.2.\n3. Services provide 100% IT Services directly to SBP internally and indirectly to SBP’s customers with semi-finished products through the Customer Teams that create a 100% service out of it. The ongoing development of the Schuberg Philis Value Proposition is also organized within Services. See Section 1.3.\n4. Labs drives innovation in SBP by scanning the trends in the industry and experimenting with new technologies for/and with our customers. This ensures that we capitalize on future technological waves and that SBP has experience with new technologies before customers ask for it/demand it. See Section 1.4.\n5. Central Teams do not work for customers directly, nor do they deliver any IT Services. They support the Customer Teams, Services Teams, Labs Teams and SBP as a whole in various ways. See Section 1.5.\n6. The Council is a group of representatives from all above teams that manages the balancing act between our short term and long-term focus. The focus is on sales and recruiting on the short term, including growth, new business, and profitability. On a strategic level the council gives direction and guidance to the organization. See section 1.6.\n7. The Bi-Monthly represents the whole of SBP. This is where we come together on a regular basis to discuss strategy, performance and where we get consent on decisions that impact the entire company. See Section 1.7.',
      ),
      header('Customer Teams', 1, true),
      beside(
        text(
          'Customer Teams are at the heart and the core of SBP. Each Customer Team consists of such a team of experts and is fully empowered to be able to deliver on their own promise to the customer. The team is also accountable for ensuring customer happiness and trust. Team members work together to deliver the type of experience and innovation that their customer really cares about. They also manage the customer’s risks as well as Schuberg Philis’ risks, while also ensuring a healthy financial result and outlook. We believe that a team can only deliver its promise if it fully understands the context of the customer’s business and challenges. A customer team serves as the primary home base for every colleague (apart from colleagues not working directly for Customers).',
        ),
        // Crop of the organisation chart (page 6): the four GCT columns with their Customer Teams.
        image(
          '/assets/seeds/sbp-odg/gct-customer-teams.png',
          'Greater Customer Teams and their Customer Teams',
          0.633,
        ),
      ),
      text(
        'Typically, a Customer Team is multidisciplinary and relevant combinations of expertise, like:\n• All technical skills across the whole stack.\n• Technical and functional/business/domain expertise.\n• Sales and delivery expertise.\n• Plan and build and run expertise (“BizDevOps”).',
      ),
      text(
        'Each Customer Team organizes itself in a way that best fits the job-to-be-done for the customer, and it attracts the right team members to perform that job. A typical Customer Team includes the following roles:\n• Mission Critical Engineers, form the technical heart of the team, which allocate different responsibilities amongst each other in roles like Tech Lead, Security Lead, and Data Protection Lead.\n• Subject Matter Experts (SME), who are non-engineers with specific functional and/or domain expertise, e.g. consultants, data scientists and business process specialists.\n• Customer Operations Manager (COM), known externally as Customer Director Delivery who are supported by project/program managers (PM) for larger projects.\n• Sales, known externally as Customer Director Sales.\n• Managing Director (MD).',
      ),
      beside(
        text(
          'A typical Customer Team is made up of 5-25 colleagues, with exceptions on both sides of the range. We foresee an increase in our (average) team size in the years to come. We already have some customers where multiple teams are active for that customer, but for various Customer goals or departments. In this case a team of around 35-40 people are involved. They have separate smaller team meetings and monthly team meetings for the entire Customer Team, so for all teams working for that one customer.',
        ),
        // Photo (page 7): hands building a LEGO city model on a projected map.
        image(
          '/assets/seeds/sbp-odg/photo-lego-model.jpg',
          'Photo: a LEGO city model on a projected map',
          0.667,
        ),
      ),
      header('Engineering Lead roles', 2, true),
      header('TechLead', 3, false),
      text(
        'A TechLead (TL) is a Mission Critical Engineer with added technical leadership responsibilities and is the default go-to point of contact when technical leadership is needed. The TL is known in this role by the Customer. Therefore, the TL is part of the Customer Team’s leadership in a triangle of peers with the customer director sales and customer director delivery, which we often refer to as the Leadership Triangle. In that triangle the TL is the technical conscience of the team and customer. When consent is needed about technical stuff, the TechLead arranges for and organises the decision-making process within the team. The TechLead stimulates and encourages the reuse of best practices and standard solutions as much as possible. The TechLead is responsible for formulating and maintaining a technical vision for the Customer and making sure this vision is articulated in a Technical Vision document. (This is still work in progress in May 2024). In smaller teams there is one TechLead, while in big teams it can be a more than full-time role that is split among several engineers. More on technical leadership in paragraph "Tech Leadership".',
      ),
      header('Security Lead', 3, false),
      text(
        'All Customer Teams have a Security Lead who is responsible for making sure the Customer environment is overall secure and in line with both what has been agreed with the Customer, and the Schuberg Philis security baseline and best practices, as well as the overall auditability of the Customer operations. As an important note: in the end, it is not just the Security Lead, but rather everybody in the team is responsible for security! The lead role is only making sure everybody acts upon this responsibility. The Security Lead is also the linking pin between the Customer Team and the central Security teams within Services.',
      ),
      header('Internal Meetings and decision making', 2, true),
      text(
        'The reference model for Schuberg Philis Customer Teams is a group of friends around the kitchen table, planning a holiday trip. It means that everybody has a say, and we decide with the whole team, with consent on all important matters. Obviously in such a “Friends at the kitchen table” context, job titles matter less, however leadership on a specific subject does. Therefore, it is super important to take time to discuss and agree on the important things together. Important whole team decisions or conversations are:\n• Who wants to do what (who takes on which role, who does what project, who wants to be responsible for what).\n• (Big) proposals including deadlines to Customers.\n• Vacancies and who is joining the team.\n• Team dynamics when things are not going smoothly between team members.',
      ),
      text('Most of these important decisions are taken in the (overall) Customer Team meeting.'),
      header('Meeting Schedule', 3, false),
      text(
        'Every team has an internal Meeting schedule with standard agenda topics and every meeting has (high level) minutes and action lists (“no meeting without an action list has meaning”):',
      ),
      table(
        'Internal meeting schedule of a Customer Team',
        ['Type of Meeting', 'Members', 'Agenda', 'Frequency'],
        [
          [
            'Customer Team Meeting',
            'Entire team',
            'Big decisions and overall performance/update',
            'At least once a month',
          ],
          [
            'Account team',
            'Com, Sales, Lead Engineers, MD (and open to every team member anyway)',
            'Tactical, Strategic and Commercial Customer topics',
            'Every 1-4 weeks depending on dynamic',
          ],
          [
            'Stand-ups / stand-downs',
            'Engineers, SME’s, COM',
            'Operational or project progress',
            'Typically daily, depending on need',
          ],
          [
            'Project team',
            'Everybody involved in a specific project',
            'Project progress and planning, impediments etc.',
            'Typically weekly or bi-weekly',
          ],
          ['Any other meeting the team deems necessary', 'TBD', 'TBD', 'TBD'],
        ],
      ),
      // Photo (page 9): a Customer Team meeting around a large table, seen from above.
      image(
        '/assets/seeds/sbp-odg/photo-team-meeting.jpg',
        'Photo: a Customer Team meeting',
        0.657,
      ),
      header('Customer Team Meeting', 3, false),
      text(
        'As said, the main meeting to discuss important things is the Customer Team Meeting. Each Customer Team meeting has a “standard” agenda: that includes customer happiness, team happiness, financial performance, commercial opportunities and innovation, operational issues incl risk & compliance and internal collaboration with other teams within SBP. It is also the meeting where we talk about how we are doing (have each other’s back), do we need to share the load better? Also, each customer team has a Strategic Account plan (and as said there will also be a Technical Vision Document in the future) in which the team sets out its goals and plans for at least a year in advance, we track progress on that plan in this meeting too.',
      ),
      header('Account Team Meeting (AT)', 3, false),
      text(
        'The Account Team discusses tactical, strategic, and commercial topics relevant to the customer. The people in the AT (or a subset) participate in the steering committee meetings with the customer and are the primary point of contact for the steering committee. The Account Team takes the lead in a rolling year plan to deliver on the customer team’s promise to the customer, innovation plan and new opportunities, customer satisfaction, team satisfaction and dynamics, risk assessment and financial performance.',
        'To be clear: there was a time when people got the impression that the Account Team Meeting was “hierarchal above” the Customer Team Meeting, but it is the other way around. This meeting was a spin-out of the Customer Team meeting, because the commercial discussions started to take too much time from the whole meeting. And any large decisions that the AT wants to take need to be taken back to the Customer Team meeting for consent.',
      ),
      header('Stand-Ups / Stand Downs', 3, false),
      text(
        'Stand-ups / stand-downs are usually related to agile rituals, what are we going to do today, what is holding us back, where do we need assistance. Each team freely organizes and schedules these meetings as they see fit.',
      ),
      header('External meeting schedule', 2, true),
      text(
        'Besides an internal meeting schedule, every team has agreed a meeting schedule with their customer in the Governance appendix of the contract/MSA. This schedule should include at least these meetings:',
      ),
      table(
        'External meeting schedule (agreed in the Governance appendix of the contract/MSA)',
        ['Type of Meeting', 'Members', 'Agenda', 'Frequency'],
        [
          ['Operational', 'Com, Leads, tbd', '', '1-4 per month'],
          [
            'Tactical',
            'Sales, Com, Leads, tbd',
            'Tactical, Strategic and Commercial Customer topics',
            'Once in 1-2 months',
          ],
          [
            'Strategic',
            'MD, Sales and/or Com',
            'Strategic course of both Customer and Schuberg Philis and what that means to both in the context of our relationship, guided by a Technology Vision',
            'At least once a year',
          ],
          [
            'Security',
            'Security Lead, GCT CISO',
            'Longer term security outlook and changing security landscape',
            'At least once a year',
          ],
          [
            'Risk',
            'Security Lead, GCT CISO, MD and/or Com',
            'Longer term risk outlook and changing risk landscape',
            'At least once a year',
          ],
          [
            'Innovation',
            'Leads, Sales and/or Com, GCT CTO and Labs',
            'Longer term innovation agenda of both Customer and Schuberg Philis and what that means to both in the context of our relationship.',
            'At least once a year',
          ],
          [
            'Architecture',
            'Com, CTO, Leads',
            'The implemented architecture and its decisions should remain aligned with the evolving enterprise architecture of the customer.',
            'At least once a year',
          ],
        ],
      ),
      text(
        'The reason this quite specific schedule is in here, because it is good to realize that the team mandates its team members to act on their behalf in the meetings with the customer. Acting means also deciding on most things directly at the table with the customer. However, if one feels: this is really outside my team mandate, I need to discuss this with the team first, then that needs to happen (typically this might happen around a desired deadline or a big commercial ask).',
      ),
      header('Greater Customer Teams (GCT)', 1, true),
      beside(
        text(
          'A GCT is a group of Customer Teams organised around a geographical market and/or a vertical market.',
        ),
        // Crop of the organisation chart (page 11): the four GCT columns with their MDs (Erik-Jan Kool,
        // Mark van ’t Kruijs, Jeroen Borst, Tom den Hartog, Arjan Eriks, Arthur van Schendel, José
        // Brenninkmeijer, Gert de Jong) and Customer Teams.
        image('/assets/seeds/sbp-odg/gct-mds.png', 'Greater Customer Teams and their MDs', 0.846),
      ),
      text(
        'We introduced the GCT’s in 2018 to create a bit smaller “business units” than the whole of SBP to:\n• Create a home base for everybody like a larger family: small enough to know everybody.\n• And large enough to handle larger projects and workload variation in Customer Teams.\n• Drive entrepreneurial spirit and growth: GCTs have a lot of autonomy on how to define and reach their goals.\n• Make it easier to onboard new Customers and team members.',
      ),
      text(
        'Currently we have the following Greater Customer Teams (GCT’s) with the following leadership roles:',
      ),
      table(
        'Greater Customer Teams and their leadership roles',
        [
          'GCT',
          'Full name',
          'MD',
          'Sales Council',
          'COM Council',
          'Engineering',
          'Security (CISO)',
        ],
        [
          [
            'AM',
            'Asset Management',
            'Erik Jan Kool (SC), Mark van ’t Kruijs (CC)',
            '(Erik- Jan Kool (SC))',
            'Eva Noordhoek (CC)',
            'Rutger te Nijenhuis (TC)',
            'Waldo de Borst (Sec)',
          ],
          [
            'FS',
            'Financial Services',
            'Jeroen Borst (CC), Tom den Hartog (SC)',
            '(Tom den Hartog (SC))',
            'Prashant Tapkhirwala (CC)',
            'Kim van Wilgen (TC)',
            'Bart Oudhuis (Sec), Frank Breedijk (Sec)',
          ],
          [
            'PUR',
            'Public, Utilities and Retail',
            'Arjan Eriks (CC), Arthur van Schendel (SC)',
            'Remco Westerlaken (SC)',
            'Henk van der Schuur (CC)',
            'David Prytula (TC)',
            'Daan Stakenburg (Sec)',
          ],
          [
            'RTM',
            'Rotterdam',
            'José Brenninkmeijer (CC), Gert de Jong (SC)',
            'Gert de Jong (SC)',
            'Sander Koers (CC)',
            'Jeroen de Korte (TC)',
            'Richard Ball (Sec)',
          ],
        ],
      ),
      text(
        'SC: member of overall Sales Council, CC: member of overall Com Council, TC: member of overall Technology Council, Sec: member of overall Security Council',
      ),
      header('Meetings and Decision making', 2, true),
      text(
        'Not all GCT’s are organizing things the same way but most have these meetings within the GCT:',
      ),
      table(
        'Meetings within a GCT',
        ['Type of Meeting', 'Members', 'Agenda', 'Frequency'],
        [
          [
            'GCT Team Meeting',
            'Entire GCT',
            'Financials, opportunities, innovation / new stuff for customers',
            'At least monthly',
          ],
          [
            'GCT Account Team',
            'Sales, Coms, TechLeads, MD’s, Business Consultants',
            'Planning, aligning sales and delivery, formation planning',
            'At least monthly',
          ],
          [
            'GCT Sales Meeting',
            'Sales, MD’s and in some GCT’s Coms and/or Business Consultants as well',
            'Funnel existing customers and opportunities. Monitoring progress',
            'At least bi-weekly',
          ],
          [
            'GCT COM Meeting',
            'Coms, MD and in some GCT’s TechLeads as well',
            'People, Recruitment, Teams well-being, Operations and Quality, share learnings',
            'At least bi-weekly',
          ],
          [
            'GCT TechLead Meeting',
            'GCT CTO, TechLeads',
            'Innovation, Standardization, Training, Quality, Presales Engineering',
            'Monthly',
          ],
          [
            'GCT SecLead Meeting',
            'GCT CISO, SecLeads, SecTeam',
            'Security operations and incidents, risk mitigation operation',
            'Monthly',
          ],
        ],
      ),
      header('GCT Sales Meeting: how to grow our business', 3, false),
      text(
        'Sales are organised in GCT’s and underlying Customer Teams. Especially when it comes to new Business GCT’s create a plan, both quantitative forecast/target/ambition scenarios low/medium and high, as well as qualitative: how to get there for their market. In this strategy it is also explicitly clear on how to acquire at least two new logos’ per GCT per year. In the usually bi-weekly GCT sales meeting, both new business for existing as new customers is discussed, statuses updated, and priorities set. In the GCT sales meeting Customer and Opportunity qualifications (“Do we want this customer/opportunity and why”) are done or validated. The GCT Sales Meeting is responsible that both the forecast (weighted pipeline) as the ambition scenarios are always up to date.',
      ),
      header(
        'GCT Account Team Meeting (GCT AT): aligning and integrated business planning',
        3,
        false,
      ),
      text(
        'Most GCT’s have an Account Team meeting on the GCT level as well. Very similar to Customer Account Teams discussing the tactical, strategic, and commercial topics relevant to the customers in the GCT. We also discuss relevant Schuberg Philis updates in this meeting to assure that we are all aligned. The financial performance of the GCT is managed and discussed in this meeting. One of the key subjects from both a financial as a growth perspective is “Integrated Business Planning”.',
      ),
      header('Integrated Business planning in GCT AT and/or GCT Com meeting', 3, false),
      text(
        'An important aspect of the tactical steering on a GCT level is the balancing of sales (revenue) and team size and growth (FTE’s/cost). We need to make sure we can deliver up on our promises by having the right people with the right skills available on time. At the same time, we need to act financially responsible and profitable.',
        'As earlier said, one of the main reasons to have GCT’s is to make it easier to onboard new projects and customers. Cooperation within GCTs makes it easier for Customer Teams to obtain support, knowledge, and expertise (and simply capacity) from other teams when needed and/or to form a new Customer Team to pursue and onboard a new customer. In a GCT AT meeting (and in some GCT’s this actually happens mostly in the GCT COM meeting) all commercial opportunities are matched with the people needed for this engagement, already early in the sales phase. Already when we go from just talking to the customer, into budgetary proposal and design, a COM and Tech Lead join the Sales in the engagement. When the probability of the opportunity grows and more detailed work is required, the team is grown along the way. As soon as the customer signs the deal, the actual team that made the proposal will actually deliver it.',
        'When in the GCT AT meeting it turns out there are not enough people with the desired skillset in the GCT, this need will be expressed also outside the GCT in a central meeting we call “LEAP”. On a weekly basis this LEAP meeting aims to solve any delivery issues we might have to serve our customers. This is where Sales, Recruitment, Coms and engineers of the GCT’s work in alignment solve all these puzzles in the best way possible for SBP as a whole. This requires flexibility and giving and taking from all GCT’s and it’s a great good we do this so well.',
      ),
      header('GCT COM Meeting: how to organize our delivery', 3, false),
      text(
        'As our main kpi is 100% Customer satisfaction, 100% delivery is key. In the GCT COM meeting we discuss all aspects of delivery. These include high level project statuses and go-lives, people matters like well-being of colleagues and teams, the needs that the teams have in specific skills and earlier mentioned integrated business planning.',
        'The GCT COM meeting also focuses on creating and distributing best practices. Quality in all dimensions is a fixed agenda topic, and the monthly security report is therefore discussed, as well as new trends or offerings that are relevant for the Customers. The agenda for the GCT COM Meeting has a fixed list of returning subjects, and the priorities and time per subject are set per meeting.',
      ),
      header('GCT TechLeads Meeting: aligning on technology', 3, false),
      text(
        'While our self-steering teams make their own technology-related decisions independently with full context of the customer environment, it does help when we stay aligned as much as possible and standardize our technology best practices as much as we can.',
        'The TechLeads for a GCT meet monthly to discuss what’s going on in the GCT from a technology perspective at a high level. Recurring topics include technology adoption, standardization, understanding technology needs for upcoming projects and new prospects, technical training, and more. It is also a meeting where we get to inspire each other.',
      ),
      header('Growth strategy in GCT structure', 3, false),
      text(
        'The GCT structure was introduced in 2018. One of the important reasons was to bring back an entrepreneurial spirited structure in which a small team of MD’s, Coms, Sales, and other leaders can cooperate and grow the business in a way that best fits their market. So, an existing GCT will grow by both growing existing customers (and their customer teams) as acquiring new Customers. The idea of size is that GCT’s are roughly been between 50 and 100 colleagues each, so you still know each other. As soon as a GCT grows to somewhere between 100 and 125 colleagues we will then split this GCT into two new ones. This is exactly how we have split GCT PUR in 2022 into GCT RTM and GCT PUR. With this in mind we also should think about how we grow the leadership team within the GCT while growing it, so we can actually split it in a way to also have a great leadership team ready for both new GCT’s.',
      ),
      header('Vertical specialisation and Geographic locations', 2, true),
      header('Vertical specialisation', 3, false),
      text(
        'When we started our GCT’s we chose to organise them in vertical markets (Asset Management, Financial Services and PUR (Public, Utilities and Retail)). The reason for this is that we want to bundle expertise around these vertical markets to better serve the needs of our customers, especially when we climb more and more on the value chain from infrastructure to software and business processes.',
      ),
      header('Geographical locations', 3, false),
      text(
        'With the introduction of RTM (Rotterdam) as the fourth GCT we introduced another “ordering” principle for GCT’s: geographic location as we found that especially for our customers and colleagues in the Rotterdam area location or closeness is actually quite important to serve them well. In 2025 we will open our third location EIN (Eindhoven) as the fifth GCT. This will open a new area for new colleagues to join SBP and for even more customer intimacy with our customers in that region.',
        'Please note that in our longer-term strategy we will have more geographic locations, so what we define here will have meaning for other (international) geographies as well. On a bit of a nerdy note: we use the IATA code of the nearest major airport for the abbreviations of our locations.',
      ),
      header('How we segment our markets going forward', 3, false),
      text(
        'So now we have a combination of geography and vertical markets. And we created some ground rules of how to handle a new Customer. In 80% of the cases when a new customer opportunity arises these ground rules suffice, if there is more to it, the Sales and MD’s of the possible GCT’s decide which GCT serves both the customer as SBP best in the long term. If needed the council can help decide.',
        'So, the ground rules are:\n1. First rule: The customer will live in a GCT that is located geographically closest to the customer.\n2. Then within that location the Customer will live in the GCT that has the SBP Vertical market primacy closest to the Customer business.\n3. For Customers that end up in a location that does not have (a GCT with) the SBP Vertical market primacy, that Customer team will join the “Vertical market Circle” that is chaired by this SBP Vertical Market Primacy GCT to collaborate on market strategy and execution of that strategy, together with all other Customer teams active in this vertical.',
      ),
      text(
        'For 80% of the Customers these ground rules will suffice, for the other 20% we just define what is best.',
      ),
      table(
        'Locations, GCT’s and vertical market primacy',
        ['Location', 'GCT’s', 'SBP Vertical market primacy', 'Vertical market Circle participants'],
        [
          ['Amsterdam', 'Asset Management', 'Asset Management; Pension funds; Payments', ''],
          ['Amsterdam', 'Financial Services', 'Banking; Insurance', ''],
          [
            'Amsterdam',
            'PUR: (Public), Utilities and Retail*',
            'Utilities; Retail; Food & Beverage',
            'PVH – Retail (FS)',
          ],
          [
            'Rotterdam',
            'Rotterdam',
            'Transport & Logistics; Public Sector',
            'KLM – Transport and Logistics (PUR); NS – Transport and Logistics (PUR)',
          ],
        ],
      ),
      text(
        '*PUR is the GCT of which RTM was formed. From the start, RTM focussed on Transport & Logistics and Public Sector. The name PUR did not change and the focus remained on Utilities, Retail and Food.',
      ),
      header('Locations and where do our teams work?', 2, true),
      text(
        'As a ground rule: Customer teams work at the location of the GCT your Customer team is part of. This is where Customer Team meetings take place etc. And on a personal level: we aim for that we all can work for a customer - and thus GCT location - near the proximity of our home. So that we all jointly minimize travel time and cost and can truly feel at home in the GCT and location that we are in as well.',
        'We are committed to create inspiring office locations that support teamwork with good working-, meeting- and restaurant facilities. The office should be a place to be together as a team, to inspire each other, to do great work and have a good time together. Some teams decide to partly work at the customer location, and some teams agree that you can work one or two days from home. Primarily we have gained the experience that working together physically at least three times a week allows the best collaboration. Our teams decide themselves how to implement these 3 days physically together in a way that best serves them. We have defined our [[Guiding Principles for Remote Working]] on confluence.',
      ),
      header('Services', 1, true),
      beside(
        text(
          'Services has a dual responsibility:\n1. Services facilitates colleagues with IT services and processes to run the business in the best possible 100% way.\n2. Services builds and runs scalable re-usable digital assets (semi-finished products) that are used by Customer Teams to service their customers in the best possible 100% way.',
          'In both responsibilities Services takes care of the complete delivery life cycle, including onboarding, building, execution, and grave-yarding of these IT Services. Services that are provided by the Services to a Customer Team are called “Internal Services (IS).”',
        ),
        // Crop of the organisation chart (page 16): the Services column (Backbone, SaaS, Cloud, Trust,
        // Workplace) under Willem Jan van den Brekel, Services Director.
        image('/assets/seeds/sbp-odg/services.png', 'Services', 3.229),
      ),
      header('Teams and Leadership', 2, true),
      text(
        'Overall leadership of Services consists of:\n• Two Services Directors (SD) sharing leadership:\n• Willem Jan van den Brekel\n◦ representing Services in the SBP council on a weekly basis to ensure continuous commercial/effort alignment with GCT’s\n• Giel Hermans\n◦ joins the SBP council on a 4-6 week basis when Services is specifically on the agenda\n• The CTO for Services:\n• Thijs van Leeuwen\n• The CISO for Schuberg Philis and Services:\n• Daniele Bonomi',
      ),
      text('Services consists of several teams:'),
      table(
        'Services teams (the table continues on the next page with a repeated header row)',
        ['Team', 'Description', 'Leadership'],
        [
          [
            'Backbone',
            'Development and run of the financial and administrative systems that supports Schuberg Philis’ business',
            'Willem Jan van den Brekel (SD), Xiomara Doerga (PO)',
          ],
          [
            'Backbone – Connect',
            'Internal application development',
            'Willem Jan van den Brekel (SD), Costas Tyfoxylos (SL)',
          ],
          [
            'Backbone – Data Services',
            'Providing data management and data insights',
            'Willem Jan van den Brekel, Yatendra Yadav (TL), Robbert Cornelissen (SL)',
          ],
          [
            'Backbone – FBA',
            'Functional Business Analysis: providing IT business & IT integration services',
            'Willem Jan van den Brekel (SD), Robbert Kooijman (TL/SL)',
          ],
          [
            'SaaS',
            'Providing internal applications used by most Customer Teams',
            'Giel Hermans (SD), Yorick Hoorneman (TL), Rudi Heinen (SL)',
          ],
          [
            'Cloud',
            'Build, maintain and run of Schuberg Philis’ cloud offerings and solutions.',
            'Giel Hermans (SD)',
          ],
          [
            'sbp.cloud & DMS',
            'Schuberg Philis’ home build and run IaaS cloud platform used for part of our customers and Schuberg Philis as a successor of the Mission Critical Cloud (MCC) that will be deprecated medio 2024',
            'Giel Hermans (SD), Onno van den Berg (TL), Mike van Goor (TL), Conraad Botha (SL)',
          ],
          [
            'Public Cloud Acceleration Platform AWS',
            'AWS build and maintain Schuberg Philis’ AWS cloud enablement platform for mission critical public cloud services.',
            'Giel Hermans (DS), Stephen Hoekstra, Marwin Baumann (TL, SL)',
          ],
          [
            'Trust',
            'Taking care of SBP’s and Customer Teams security and compliance and Security Services and Solutions',
            'Daniele Bonomi, Maikel de Maertelaere',
          ],
          [
            'Trust – Audit & Assurance',
            'Assuring compliance and adherence to all necessary standards for Schuberg Philis and Customer Teams',
            'Giel Hermans (SD), Maikel de Maertelaere (TL), Anto Čolić (SL)',
          ],
          [
            'Trust-Security',
            'Keeping Schuberg Philis’ IT and the Customer Teams secure',
            'Giel Hermans (SD), Laurent Fanis (TL), Daniele Bonomi (SL)',
          ],
          [
            'Trust-Security Services',
            'Developing Security Services and Solutions',
            'Willem Jan van den Brekel (SD), Sandeep Gangaram (TL)',
          ],
          [
            'Workplace',
            'Delivering the best possible IT workplace to colleagues and internal IT workplace support',
            'Giel Hermans (SD), Gerard Spierenburg (TL), Myra Lanters (SL)',
          ],
        ],
      ),
      text(
        'A typical size of a Services Team is 4-8 colleagues. Every Services team has a TechLead (TL) and a Security Lead (SL).',
        'To align teams within Services and with company developments there as a Services AT meeting (monthly) and a Services All hands meeting (bi-monthly).',
      ),
      header('Labs', 1, true),
      header('Labs and Lab 271', 2, true),
      beside(
        text(
          'Labs is responsible for driving innovation throughout SBP by experimenting with new technologies. This provides SBP a boost towards new technologies and ensures that we capitalize on that next technological wave. They reside in a special place called Lab271. It’s worth checking out! You’ll find Lab271 behind the door in the middle of the restaurant at the Amsterdam office.',
          'Labs is a cost centre (this means they do not have customers themselves) and available for everybody within SBP to support with unconventional approaches to develop the relationship further. With that we mean, dare to dream, do something not done before, find alternative ways of experimenting and experiencing technologies new to the customer. Like for example the collaboration we did with Leiden University, IBM and the Dutch Ministry of Finance on quantum computing. Alternative partnerships with both private companies and academia are developed through external grants (subsidies), like the “let’s go project” with SIG, Surf/Sara and VU on green IT.',
          'Lab271 is working along three dimensions: top-down supporting the Schuberg Philis Strategy and bold moves, bottom-up through their own agenda of trends and relevant topics and side-ways supporting and facilitating customer requests.',
          'Lab271 is releasing a yearly vision document in which the innovation agenda for both Labs and therefore Schuberg Philis for the coming year is defined.',
        ),
        // Crop of the organisation chart (page 18): the Labs column (Academic Partners, CTO Office,
        // Incubator, Labs).
        image('/assets/seeds/sbp-odg/labs.png', 'Labs', 3.268),
      ),
      header('Academic Partners', 2, true),
      text(
        'Lab271 is the main driver for the relationships with academic institutions. This is the primary homebase for our growing team of interns working on internal and customer projects. Since last year new collaborations between international private/public consortia are setup. Like for example collaboration on Cyber Security in the Harbour at the Erasmus University in Rotterdam.',
      ),
      header('Incubator', 2, true),
      text(
        'Lab271 likes to be the incubator of new applications, projects, demos, and ideas for SBP. They are here to help colleagues and customer teams build small prototypes or larger test setups both for customers or internal SBP use. For example, the work that Labs did for the new Geldmaat digital Kiosk, the PostNL parcel locker project, or the Edge laboratory for NS.',
        'They also support early-stage development of new tools or technologies that need to mature before they may become a fully supported 100% service. For example, look at pilot projects like Miro, GitHub Copilot, chat.sbp.ai, or the EV app.',
      ),
      header('CTO Office', 2, true),
      text(
        'Lab271hosts our central CTO Office from where they support the SBP engineering community. They focus on technology-related strategy, events, training, and partnerships. They can provide a boost to knowledge circles and sponsor their initiatives. They watch trends, sense what is coming up, and spread knowledge at events.',
        'The CTO Office aligns with the Technology Council for direction. For more information about Technical Leadership within Schuberg Philis please refer to paragraph: Technical leadership.',
      ),
      header('Central Teams', 1, true),
      beside(
        text(
          'Central Teams do not work for customers directly, nor do they deliver any IT Services. They support the Customer Teams, Services Teams, Labs Teams and SBP as a whole in various ways.',
          'A typical size of a Central Team is 4-10 colleagues.',
        ),
        // Crop of the organisation chart (page 19): the Central column (Assistants, Facility, Finance,
        // Marketing, People, Recruitment, Restaurant) linked to Philip Dries, David Dijkhuis, Mark van ’t
        // Kruijs and Ivo Roefs.
        image('/assets/seeds/sbp-odg/central-teams.png', 'Central Teams', 2.286),
      ),
      text('The Central Teams are:'),
      table(
        'Central Teams',
        ['Team', 'Focus', 'Team Leads', 'Council representative'],
        [
          [
            'Executive Assistants',
            'Helping us to remain in control of schedules, meetings and tasks, usually work for a GCT',
            'Isabel Becker',
            'Philip Dries',
          ],
          [
            'Facility',
            'Taking care for our office, from building maintenance, AV media to coffee machines',
            'Xander Vlasblom',
            'Mark van ‘t Kruijs',
          ],
          [
            'Finance',
            'Keeping track of revenue and costs, paying our salaries and expense claims, organizing the EOP, and many other things',
            'Hans Tuppe',
            'David Dijkhuis',
          ],
          [
            'Marketing',
            'Creating the (sales) materials, publications, social media presence, website, campaigns and events to further improve our positioning and our brand',
            'Annemieke Deering',
            'Ivo Roefs',
          ],
          [
            'People',
            'Supporting well-being, coaching, learning & development, appraisals, and remuneration of all colleagues',
            'Kevin Struis',
            'Philip Dries',
          ],
          [
            'Recruitment',
            'Identifying, selecting, attracting, and onboarding the best talent',
            'Elvira Dijksman',
            'Jeroen Borst',
          ],
          [
            'Restaurant',
            'Providing and hosting our signature lunches, dinners and “borrels”',
            'Paul Metz',
            'Ivo Roefs',
          ],
        ],
      ),
      header('Schuberg Philis Council', 1, true),
      // Crop of the organisation chart (page 20): the Schuberg Philis Council row with all Council
      // members.
      image('/assets/seeds/sbp-odg/council.png', 'The Schuberg Philis Council', 0.116),
      text(
        'The Schuberg Philis Council is the overarching Leadership and decision-making body in Schuberg Philis and is the linking pin between all the teams that have been described before. The Council represents the entire company, and it is where the decisions are made or prepared that affect Schuberg Philis as a whole.',
        'A council, by its definition, is a group of individuals who are concerned with providing advice, guidance, or decision-making on a particular issue or topic. A council can have different roles and functions depending on the context, but they often have some level of authority or influence in their respective domains.',
      ),
      header('Daily governance and Strategic Decisions', 2, true),
      text(
        'In SBP, the council is the overarching organ of coordination and consent for decisions that (can) affect Schuberg Philis as a whole. This is done in close cooperation by all representants. The council manages the balancing act between our short term and long-term focus for SBP. The focus is on sales and recruiting on the short term, including growth, new business, and profitability. On a strategic level the Council gives direction and guidance for the organization. We also have the Board to Bridgepoint, our major shareholder. SBP is represented by 2 Founders: Gerwin and Philip and our CFO David. For strategic decisions regarding reserved matters, the Board consults with Bridgepoint. Please also see chapter 3.11.2',
        'For the avoidance of doubt: the actual impact we make as an organization happens in the Customer Teams and the Central Teams, where not only the work is done, but also a lot of the actual leadership takes place. The Council focuses on the alignment, prioritization, resource allocation and investments, a balancing act on profitability considerations and so on. In the end we are one SBP and these things are highly integrated and intertwined.',
      ),
      header('Company alignment and fast decision making', 2, true),
      text(
        'The forming of the Council in early 2023 was a reaction to the need that we felt to be more aligned as an organization with the fast pace of change we are in, and at the same time we wanted be able to make better decisions faster. Before 2023 we had a two-tier structure with the founders and MD’s that proved to be not as effective. We considered different options as it seemed a group of 15 leaders is rather large, but we still decided in favor of this larger Council. The guiding “dream” was that we have the “whole system in the room every week, so that we can take decisions on whatever we need to, right away again.” This larger group, however, requires that we need to be very disciplined and well prepared to have effective meetings. So, we promised to always have an agenda with a fixed time schedule, that is shared up front, and the Chairman is responsible for strict time management.',
      ),
      header('Leadership is not only top-down or bottom-up', 2, true),
      text('This is the introduction text of chapter 4 “Involved Leadership”:'),
      callout('quote', {
        title: '',
        body: "What we defined already in 2012 in our key values: Leadership. We are all in. Leadership for us is not about hierarchy, top-down or bottom-up, centralized or decentralized. In truth, it's in the whole – in people taking the lead because they care about our shared promises and beliefs. Decisions are made with the active consent of the expert team and all relevant and affected parties. With freedom comes great responsibility.",
        source: 'Organizational Design Guide, chapter 4 “Involved leadership”',
      }),
      text(
        "So, it's really about both “top-down and bottom up”. And we need both, and we need to organize in a way that we get the best out of both. A good example is how we go about with our Value Proposition. Many of the ideas that we get for new services are initiated “bottom-up”. A few people have a good idea and start working on it. They start collaborating and something valuable is created/initiated. Based on real-world experience, usually within one or more customer teams. What we have seen is that it then needs “top-down” support to scale it in a way that all teams can benefit from it in the future. Without some organization and proper attention and support from leadership, it becomes hard for the organization to prioritize/invest in the right things. It is a leadership responsibility to create (just) enough structure and organization so important things get the priority and funding they deserve.",
        'In Chapter 4 we will go in deeper, but in the context of the Council it is good to realise that the Council is there to provide this kind of leadership attention, priority, and funding, for all the things that we deem important as an organization.',
      ),
      header('Team members & Representation', 2, true),
      table(
        'Council members and what they represent',
        ['Council member', 'Representing', 'SBP role', 'Council role'],
        [
          ['Jeroen Borst', 'GCT FS', 'MD', 'Chief Operating Officer'],
          ['Jose Brenninkmeijer', 'GCT RTM', 'MD', ''],
          ['David Dijkhuis', 'Finance', 'CFO', 'Chief Financial Officer'],
          [
            'Philip Dries',
            'Founders, Assistants, People and Recruitment',
            'Founder',
            'Chief People Officer',
          ],
          ['Arjan Eriks', 'GCT PUR', 'MD', 'Vice Chairman'],
          ['Tom den Hartog', 'GCT FS', 'MD', ''],
          ['Ilja Heitlager', 'Labs', 'Chief Innovation Officer', 'Chief Innovation Officer'],
          ['Gert de Jong', 'GCT RTM', 'MD', ''],
          ['Erik Jan Kool', 'GCT AM', 'MD', 'Chief Commercial Officer'],
          ['Mark van ’t Kruijs', 'GCT AM', 'MD', 'Quality & Trust Officer'],
          ['Willem Jan van den Brekel', 'Services', 'Services Director', ''],
          ['Ivo Roefs', 'Marketing', 'CMO', 'Chief Marketing Officer'],
          ['Arthur van Schendel', 'GCT PUR', 'MD', ''],
          ['Gerwin Schuring', 'Founders', 'Founder', 'Chief Executive Officer, Chairman'],
          ['Leo Simons', 'Engineering community', 'CTO', 'Chief Technology Officer'],
        ],
      ),
      text(
        'The council is designed in a way that every person within Schuberg Philis has direct access to a council member that represents them. More on representation and participation in Chapter 3 on Participation.',
      ),
      header('Council Meeting', 2, true),
      text(
        'The Council meets every Wednesday, in the even weeks for max 4 hours and the uneven weeks for 2 hours.',
      ),
      meetings('Council meeting', [
        ['Council', 'Weekly', 'Boardroom', 'Wednesday', '14:00', 'here (link)'],
      ]),
      header('Example Council Agenda:', 2, true),
      // January 15, 2025 — Council agenda. 0. Meeting Logistics & General Remarks (14:00, 45 min, until
      // 14:45): ✓ Approving minutes (All) ✓ Check-in (All) ✓ Team updates (All) ✓ Cool things to mention
      // (All) ✓ Update Horizon (Gerwin/David) ✓ Commercial Excellence (Gerwin). 1. Sales & New Business
      // — Erik-Jan — 14.45, 15 min, 15.00. 2. IBP Update — Jeroen — 15.00, 15 min, 15.15. 3. Hours
      // Margin Concerns — David/Frank/Philip — 15.15, 15 min, 15.30. 4. Agenda Bi-Monthly — Ivo — 15.30,
      // 15 min, 15.45. 5. Any Other Business — All — 15.45, 15 min, 16.00.
      image(
        '/assets/seeds/sbp-odg/council-agenda.png',
        'Example Council agenda, 15 January 2025',
        0.518,
      ),
      text(
        'Agenda item 0, 1 & 2 are always on the agenda, this is the daily running of the company. We look at the latest trends and developments and make each other aware on what needs to be done to ensure converting opportunities in deals and ensuring 100% delivery. All other topics have a different frequency and are planned by individual council members in consultation with the Chairman and Isabel Becker (as the EA of the Council). They include these Council meeting subjects:',
      ),
      table(
        'Council meeting subjects',
        ['Subject', 'Frequency', 'Responsible Council member'],
        [
          ['Sales & New Business', 'Weekly', 'Erik-Jan Kool / CCO'],
          ['Integrated Business planning, including recruiting', 'Weekly', 'Jeroen Borst / COO'],
          [
            'Commercial Excellence',
            'Monthly',
            'Gerwin Schuring (+ Erik Jan Kool, Ivo Roefs, David Dijkhuis)',
          ],
          ['Financial MSR, Monthly results', 'Monthly', 'David Dijkhuis / CFO'],
          ['Quality & Trust update', '6 weeks', 'Mark van ‘t Kruijs / Q&T Officer'],
          ['Services update', '4-6 weeks', 'Willem Jan van den Brekel & Giel Hermans'],
          ['Next Bi-Monthly', '6 weeks', 'Ivo Roefs / CMO'],
          ['Technology update', '8 weeks', 'Leo Simons / CTO'],
          ['Strategy update', '6 weeks', 'Ilja Heitlager / CIO'],
          ['Value Proposition update', '8 weeks', 'Gerwin Schuring / VP lead'],
          ['Labs update', '8 weeks', 'Ilja Heitlager / CIO'],
          ['Tech Talk (learning experience)', '8 weeks', 'Ilja Heitlager / CIO'],
          ['Council retro', '6 months', 'Leo Simons / Ilja Heitlager'],
        ],
      ),
      text(
        'If you want the Council to address a certain topic, please reach out to your Council representative.',
      ),
      header('Founders, Horizon and Bridgepoint.', 2, true),
      text(
        'Schuberg Philis has been founded by three Founders: Pim Berger, Philip Dries and Gerwin Schuring. They started Schuberg Philis in 2003 as they wanted to do things differently in our industry. They were driven by what we is now described in our Culture and DNA document in great detail, but in essence they back then already believed in 100% Happy Customers & Happy teams. A good overview is in our Narrative too. In early 2024 Pim had to decide to shift his priorities in life because of health reasons. Philip and Gerwin wanted to fully support him in that, and together with Pim they decided to take on the search for a new shareholder in true 100% SBP style and they started project Horizon. As a first step they took on David Dijkhuis (who as a result of the project also became our CFO) and about a year later the end result of this very diligent and intense project was that on January 14th 2025 a transaction was concluded with Bridgepoint to become our new majority shareholder and partner.',
        'Our Founders remain actively involved, with Gerwin Schuring as our CEO and Council Chairman and Philip as our Chief People Officer. Besides their role in the Council, they also remain large stake shareholders of Schuberg Philis. The role of the Founders primarily consists of driving long-term strategy, creating the appropriate organizational design, appointing and coaching Council members, monitoring and challenging the performance of SBP, and safeguarding SBP’s unique culture and DNA. Together with Bridgepoint they also have the formal leadership role of SBP. This is described in section 3.11 on legal governance. In short: The role of the council remains unchanged. Gerwin, Philip (and David) will from now on share the responsibility for the “Reserved Matters” (yearly approval of Budgets, strategic changes, etc.) together with Bridgepoint in a one-tier board.',
      ),
      header('Bi-Monthly', 1, true),
      // Small version of the organisation chart (page 23) with “Schuberg Philis as a whole — Bi-Monthly
      // Meeting” highlighted around the Council and all teams.
      image(
        '/assets/seeds/sbp-odg/bi-monthly.png',
        'The Bi-Monthly: Schuberg Philis as a whole',
        0.454,
      ),
      text(
        'Every 6-8 weeks, the so called “Bi-Monthly Meeting” is organized. It is a 2-hour meeting with “the whole system in the room” and is hosted by one of our colleagues. In this meeting we share all the important information: how we are doing financially, the commercial business update, customer updates and tech updates (externally and internally). As we also announce and take company-wide decisions (and ask for your consent) in the Bi-Monthly, it is important that you are present at the live meeting or follow it online. You can also watch later if you haven’t been able to join real time. See [[How to join the Bi-Monthly]] on Confluence.',
      ),
      meetings('Bi-Monthly meeting', [
        [
          'Bi-Monthly',
          '6-8 weeks',
          'DNA AMS / Skylounge RTM',
          'Tue / Thu Alternating',
          '14:00',
          '#general (link)',
        ],
      ]),
      text(
        'How do we take decisions companywide? This is explained in detail in Chapter 3 on Participation.',
      ),
      header('Referenced documents', 1, false),
      row(
        linkCard('Guiding Principles for Remote Working', 'Confluence'),
        linkCard('How to join the Bi-Monthly', 'Confluence'),
        linkCard('Council meeting minutes', 'SharePoint'),
      ),
      row(linkCard('#general', 'Slack')),
    ]),
    seedSection('sbp-odg-s2', 'Specific Leadership Structures', true, [
      text(
        'SBP has created formal leadership structures to enhance decision making for specific groups or themes. In this way we want to bring expertise and representation together. These leadership structures are organized on top of the team structures that we explained in the previous chapter. Currently we see these specific leadership structures:\n1. Sales Leadership\n2. COM Leadership\n3. Security Leadership\n4. Technical Leadership\n5. Quality & Risk Leadership\n6. Strategy Leadership\n7. Coaching Leadership\n8. IBP Integrated Business Planning Leadership\n9. Value Proposition Leadership\n10. Circles',
      ),
      header('Sales Leadership', 1, true),
      // Sales Council and All-Sales Meeting (page 25). Sales Council: GPD (Gerwin Schuring, Founder,
      // Chairman/CEO; Philip Dries, Founder, Chief People Officer; David Dijkhuis, CFO), Erik-Jan Kool
      // (MD, CCO, Chairman), Tom den Hartog (MD, Vice Chairman), Arthur van Schendel (MD), Remco
      // Westerlaken (Sales Lead), Gert de Jong (MD), Ivo Roefs (CMO). Sales AM: Sebastiaan Blok, Frank
      // van Dijk, Marc Loo, Mark Rotteveel (0.4). Sales FS: Jacqueline Huijser, Lukas Kortenhorst, Fred
      // Mazer, Rogier de Rooij, Hans den Adel, Paul Roelofs. Sales PUR: Rikkert Achtereekte, Anushka
      // Diderich (0.9), Peter Hendriks, Remco Westerlaken. Sales RTM: Anuschka Diderich (0.1), Janneke
      // Starmans, Martijn in ’t Veld, Sander Verloop, Maarten Kleyn, Andre van der Meer, Mark Rotteveel
      // (0.6). All-Sales Meeting: every 4 weeks, Wednesday 16:00 in DNA.
      image(
        '/assets/seeds/sbp-odg/sales-leadership.png',
        'Sales Council and All-Sales Meeting',
        0.456,
      ),
      header('How do we organize Sales in Schuberg Philis?', 2, true),
      table(
        'How Sales is organized',
        ['Level', 'Responsibility & Purpose'],
        [
          [
            'Customer',
            'This is the basis of our successful commercial relationships with our Customers: Every Customer has a Sales, who is, as the commercial leader of the Customer team, overall and integral responsible for all commercial aspects (Commercial strategy till execution)',
          ],
          [
            'GCT',
            'Per GCT the Sales of the different Customers work together towards the GCT goals. Usually there is a weekly GCT sales meeting. And a separate or combined new business meeting focused on new Customers',
          ],
          ['Schuberg Philis: Sales Council', 'See below'],
          [
            'Schuberg Philis: All-Sales Meeting',
            'In this meeting we share inspiration, align on priorities, share best practices across GCT’s etc.',
          ],
        ],
      ),
      header('Sales meetings', 2, true),
      meetings('Sales meetings', [
        ['Sales Council', '2 weeks', 'Vostok', 'Wednesday', '10:00', 'Minutes (link)'],
        ['All Sales Meeting', '4 weeks', 'DNA', 'Wednesday', '16:00', 'N.a.'],
      ]),
      header('Sales Council', 2, true),
      text(
        'The sales council is a representation of the Sales group. All GCT’s, Founders, Finance and Marketing are represented in the Sales Council. The Sales Council plays an important role in boosting business success by providing valuable support to the sales team. With a dual focus:',
      ),
      table(
        'The dual focus of the Sales Council',
        ['Focus', 'Responsibility'],
        [
          [
            'Alignment of Sales of whole SBP',
            'of whole SBP Align with sales leaders of GCT’s and steer towards achieving overall Sales / To ensure a predictable forecast as input for recruitment and investments and mid to long-term sustainability / To take commercial decisions: e.g. commercial engagement models, pricing decisions, cost model changes, qualification criteria, and so on / To support overall business support, to identify potential roadblocks, improve reporting, forecasting, CRM, etc.',
          ],
          [
            'Commercial Strategy Dialogues with Customer teams',
            'The idea of the Commercial Strategy Dialogue is: For critical opportunities and/or accounts we believe it is valuable to take the multidisciplinary brainpower of the Sales Council to help define/refine the Commercial Strategy for a Customer. It is an opportunity for Customer Teams, to discuss their most significant opportunities and challenges related to their customer. The Sales Council is available to help and provide fresh perspectives. These dialogues take 60-90 minutes and the preparation form can be found here: Sales Dialogue info.docx',
          ],
        ],
      ),
      header('COM Leadership', 1, true),
      // The COM Council drawn on top of the organisation chart (page 27).
      image('/assets/seeds/sbp-odg/com-leadership.png', 'COM Council', 0.458),
      text(
        'The “COM Council” aims to continuously grow closer to total excellence of the COM role by identifying attention points and bringing proposals to the COM meeting. The representation of the COM community is handled by 4-6 COMs from the GCT’s, 1 Director of Services, 3 MDs and 1 Founder in the COM Council. The meeting is chaired by Arjan Eriks and for now, the COM Council meets every other Monday. This Council focusses on providing specific improvement needs and actions moving forward. The COM council has three options to organize action:\n1. Develop a proposal by itself and bring this into the ALL COM Meeting for consent.\n2. Identify the need to organize a task force.\n3. Discuss in the ALL COM meeting, and ask members to come up with a proposal (and consent later).',
      ),
      text(
        'The COM Council feels responsible for:\n• Qualitative and quantitative elements of our business operations.\n• Staffing and Formation Planning.\n• Scaling of our operations.',
      ),
      text(
        'The "ALL COM Meeting" is a bi-weekly meeting dedicated to sharing information about our profession. The COMs share e.g. customer cases and effective ways of working. In this meeting, we discuss the latest insights and trends in both tech, compliancy and all other aspects of the COM role. We review current customer satisfaction metrics, address any mayor incidents or IT / SBP risks, and share updates on ongoing projects and service improvements. By aligning on priorities and sharing best practices, we ensure all teams are informed and equipped to meet our customers\' needs.',
      ),
      meetings('COM meetings', [
        ['COM Council', '2 weeks', 'Boardroom', 'Monday', '11.00 -12.30', 'HERE (link)'],
        [
          'ALL COM Meeting',
          '2 weeks',
          'Vostok',
          'Friday',
          '11.00 -12.30',
          'COM Board - Planner (link)',
        ],
      ]),
      header('Security Leadership', 1, true),
      // The Security Leads and the central Security Team drawn on top of the organisation chart (page
      // 28).
      image('/assets/seeds/sbp-odg/security-leadership.png', 'Security leadership', 0.454),
      text(
        'The primary responsibility to keep the customers/SBP environments safe is within the Customer Teams/ SBP Services. To organize this responsibility every customer team has appointed a Security Lead. The responsibilities of the Security Lead and how security responsibilities are split within SBP can be found [[HERE]]. In summary the Sec lead per team is the point of contact for security and audit related topics, raise security awareness and raise burning security issues with the SBP security Team. While the team is remaining responsible for offering a secure service to their customer.',
        'The Security Lead meets with the customers CISO (or similar) on a regular basis to discuss Security related topics. Both operational and tactical.',
        'Next to the Security Leads per customer team we have a Central SBP Security Team. This team is within Services and consists of our CISO and several Security Engineers. The Security Team is responsible for guiding, guarding, scaling, and facilitating on Security topics. In summary: create and execute a Security Vision and Strategy, tracking vulnerabilities, create and follow up on security advisories, share info, knowledge, and best practices, take the lead in cross team security incidents, implement security, tooling, lead the security meetings and much more.',
        'The Security Leads of the teams and the Security Team meet every 2 weeks with a fixed agenda: [[HERE]].',
        'Security is also actively discussed during all the official meetings internal and external – like operational and tactical meetings with the customers. Also, during the team meetings, the GCT meetings, the COM meetings and the Schuberg Philis Council meeting, Quality and Trust must be an active topic on the agenda.',
      ),
      text(
        'The Crisis Management Team is a cross SBP leadership team that acts as a first response to SBP wide crisis. It has a link to all the Leadership teams of GCTs, Services, Security, Facility, etc. The details of who to contact are maintained in this living document that includes the Business Continuity Plan: [[HERE]]',
      ),
      header('Technical Leadership', 1, true),
      // The Technology Council and the Tech Leads drawn on top of the organisation chart (page 29).
      image(
        '/assets/seeds/sbp-odg/technical-leadership.png',
        'Technology Council and Tech Leads',
        0.455,
      ),
      text(
        'The Technology Council is a group of technology leaders that meets weekly. The group is chaired by Leo Simons. All GCT’s and Services are represented in the technology council. The technology council is also represented in the Schuberg Philis Council. The technology council is our central authority regarding Pre-sales engineering, Technology strategy and roadmap, Technology training, and Technology partnerships.',
        'The technology council feels responsible for supporting existing teams / Tech Leads, supporting new prospects / leaders, and ensuring sharing, reuse, and standardization.',
        'Day-to-day practical technical leadership is distributed throughout the engineering community, which the technology council facilitates and organizes as needed. Primarily we make decisions via our many (technology-)specific circles and via the Tech Leads. The technology council is the primary link on technology strategy from the greater customer team to Customers and prospects and to SBP as a whole. See [[Technology Council and Tech Leads]] on confluence for more information.',
      ),
      meetings('Technology meetings', [
        ['Technology Council', 'Weekly', 'Vostok', 'Monday', '15:30', 'HERE (link)'],
        ['GCT AM Tech Leads', 'Bi-Weekly', 'Varies', 'Wednesday', '15:00', 'HERE (link)'],
        ['GCT FS Tech Leads', 'Monthly', 'Varies', 'Varies', 'Varies', 'HERE (link)'],
        ['GCT PUR Tech Leads', 'Monthly', 'Varies', 'Friday', '11:30', 'HERE (link)'],
        ['GCT RTM Tech Leads', 'Monthly', 'New Orleans', 'Thursday', '10:00', 'HERE (link)'],
        ['Services Tech Leads', 'Monthly', 'Auditorium', 'Thursday', '10:00', 'HERE (link)'],
        ['Tech Lead All Hands', 'Quarterly', 'Varies', 'Varies', 'Varies', 'HERE (link)'],
      ]),
      header('Quality & Risk Leadership', 1, true),
      // The Quality & Risk Council drawn on top of the organisation chart (page 30).
      image('/assets/seeds/sbp-odg/quality-risk-leadership.png', 'Quality & Risk Council', 0.454),
      text(
        'We include quality in everything we do. We are well known for and proud of the quality of what we deliver, and we want to be able to prove that quality to anyone at any time. This responsibility is with everyone. Individuals and Greater (Customer) Teams all guard and improve quality and manage risks.',
      ),
      header('Who is in the Quality & Risk Council?', 2, true),
      text(
        'To ensure alignment and integrate quality improvement efforts, we have established a Quality & Risk Council. This council includes representatives from each domain (Security/ Technology/ Assurance/ Finance), Greater (Customer) Teams via COMs and Services via Quality & Assurance and the SBP Council, ensuring both first line and top management commitment. Quality & Risk is a recurring topic on the agenda for all these teams.',
        'Chaired by Mark van ‘t Kruijs, the Quality & Risk Council meets bi-weekly, maintaining a central progress dashboard and regularly updating the SBP Council on Quality & Risk matters.',
      ),
      header('What topics are discussed?', 2, true),
      text(
        'This leadership structure is designed to identify potential quality issues, raise awareness, and provide support, best practices, and follow-up. The chosen structure ensures that every strategic and tactical risk and opportunity is discussed from multiple perspectives, with the potential to be addressed through the collaboration of various domains and communities, rather than in isolation. For example, a security risk might also be a technical risk, requiring additional attention across all teams and addressed via the Customer Directors. At the same time, risks specific to one domain can be brought to the relevant community and, through roles like the CISO or CTO, escalated to a central team or responsible delegates in a customer team (COM, SecLeads and/or TechLeads). Conversely, issues arising in a customer team can be escalated to the GCT, or central level, and ultimately the Quality & Risk Council. This structure provides a clear link between the Greater (Customer) Team and the overall SBP, offering flexibility in a scaling organization.',
      ),
      header('Quality Management System', 2, true),
      text(
        'We manage the quality of our products and services via our quality framework and processes. This is called our Quality Management System, and it is designed to ensure that our operations meet our internal as well as selected external quality requirements and standards and deliver consistent quality to our customers. It serves as a comprehensive guide for all colleagues and stakeholders, providing clear instructions and guidelines to set and maintain high-quality standards and continuous improvement across all areas of the organization. Our QMS is applicable to all locations and greater (customer) teams within the organization, ensuring a unified and standardized approach to quality management. Additionally, it integrates with specific domain requirements related to cloud technology, information security, privacy information, regulatory compliance, and ESG performance. The standards frameworks that form the normative references can be found in our QMS. The Quality & Risk Council is responsible for the QMS. The comprehensive description of the overall SBP Quality Management System can be found [[HERE]]. This QMS is externally audited and results in an ISO 9001:2015 certificate.',
      ),
      header('Risk Management', 2, true),
      text(
        'Acknowledging the link between quality and risk management, the Quality & Risk Council actively leads risk management, in an integrated manner, covering all relevant domains and the link between them, through quality improvement projects and risk mitigation initiatives. This Council also monitors risks that can come from external changes in regulation or threats. The Quality and Risk Council is our central interface to the regulators to distribute one visions and approach to our SBP teams. The Quality and Risk Council also keep track of the SBP wide audit calendar, to track progress and deal with exceptions where needed.',
        'On a yearly basis, a risk assessment and materiality analysis are performed. The outcome is discussed in the strategic risk meeting, which is a specific Quality & Risk Council meeting. The strategic risk meeting will therefore be attended by the same representatives as mentioned in the Quality & Risk Council. The outcome of the assessments and strategic risk meeting is shared with the SBP council afterwards. Ad hoc risks that occur throughout the year are directly brought to the attention of Quality & Risk Council and addressed there.',
      ),
      meetings('Quality & Risk meeting', [
        [
          'Quality & Risk Council',
          '2 Weeks',
          'Vostok',
          'Tuesday',
          '11:30-12:30',
          'Progress dashboard (link)',
        ],
      ]),
      header('Strategy Leadership', 1, true),
      // The Bold Move leaders and teams drawn on top of the organisation chart (page 32).
      image(
        '/assets/seeds/sbp-odg/strategy-leadership.png',
        'Strategy 2030: Bold Move leaders and teams',
        0.454,
      ),
      text(
        'For our Strategy 2030 we have defined 5 Bold Moves, each with a leader from the Council:',
      ),
      table(
        'Strategy 2030: the five Bold Moves',
        ['Bold Move', 'Slack Channel', 'Bold Move Leader', 'BM Team'],
        [
          [
            'BM1: Expand and scale our services',
            '#strategy-bm1',
            'Gerwin Schuring',
            'See Value Proposition Leadership, below',
          ],
          [
            'BM2: Reinvent our legendary culture',
            '#strategy-bm2',
            'Philip Dries',
            'Kevin Struis, Annemieke Deering, Leo Simons',
          ],
          [
            'BM3: Pioneer business transformations',
            '#strategy-bm3',
            'Ilja Heitlager',
            'Jorrit Molkenboer, Agne Nainyte',
          ],
          [
            'BM 4: Lead our industry in sustainability and responsibility',
            '#strategy-bm4',
            'Ivo Roefs',
            'Maikel de Maertelaere, Aron van der Sanden',
          ],
          [
            'BM 5: Unleash the power of automation and AI',
            '#strategy-bm5',
            'Leo Simons',
            'Julian Hessels, Laurens Eversmann',
          ],
        ],
      ),
      text(
        'Each bold move has several Key Initiatives set up, on which a group of colleagues works. In this way, we ensure a representation of the SBP organisation in our strategy execution.',
        'For more information, see the [[Strategy SharePoint site]].',
        'You can get updates on our strategy in the Bi-Monthly, in the Council meeting minutes and most of all, you can join the slack channels that are shown above.',
      ),
      header('Coaching Leadership', 1, true),
      // The People Team and all coaches per GCT (“All coach meeting 2× a year, pre-appraisal meetings
      // Jan/Feb”) drawn on top of the organisation chart (page 33).
      image('/assets/seeds/sbp-odg/coaching-leadership.jpg', 'Coaches per Greater Team', 0.453),
      text(
        'At SBP you do not report to a manager. When you want to talk about your personal development, your personal situation, or your primary or secondary employee benefits, within SBP we typically say: talk to your coach.',
        'A coach is a formal role within SBP. Every colleague at SBP has one coach. Colleagues who volunteer and qualify as a coach can take on this role. A coach–coachee relation is a two- sided choice: coachees get to choose their own coach (hence “choose your own coach”), if the coach also agrees to be their coach. For new colleagues, a first coach is assigned for the first six months, after which a colleague can choose a new coach if they want to. We encourage coach-coachee relations to stay within the GCT if possible.',
        'An important formal responsibility of your coach is navigating coachees through the appraisal process and providing feedback from the organization to you about that process. See [[Appraisal Process]] on confluence for more information.',
        'Other formal aspects of the coaching role are that the coach approves the order of your company car, or approves your personal expense claims, or similar things. A coach will check on you from time to time about your well-being. If you are ill for a longer period, a coach will call you to check on how things are and if any help is required, getting advice from the People team. Caring about each other is considered essential within SBP. But besides the formal aspects of the coach–coachee relation, its success is also dependent on the informal personal leadership of two colleagues.',
        'First and foremost, it is up to the coachee to make the best out of the relation, by being open, reflective, constructive and committed about their own development. And second, it requires the coach to relate to the coachee their potential, to strive for an adult-adult relationship, and to be available and committed to their coachee. If this all works out, it is an extremely powerful relationship. If not, it is the responsibility of both coach and coachee to discuss whether and how to improve, or how to arrange for a new match with someone else. In general, we consider changing coach every three to four years a healthy thing to do.',
        'For more info on coaching, please read [[Coaching within Schuberg Philis]] on confluence.',
      ),
      header('Integrated Business Planning Leadership', 1, true),
      // The Integrated Business Planning (LEAP and IBP Council) representatives drawn on top of the
      // organisation chart (page 34).
      image('/assets/seeds/sbp-odg/ibp-leadership.png', 'Integrated Business Planning', 0.454),
      text(
        'Integrated Business Planning wants to have the best match between the work requested by our customers and the colleagues working at SBP. Therefore, we need insight in skills needed and available in time, whilst challenging allocation and vacancies against affordability. We also need to have a near real time insight in shortages including priority setting and surpluses of these skills. Next to that we want to adopt our organization in time for changing needs in the (near) future.',
      ),
      header('Leap Meeting', 2, true),
      text(
        'The Integrated Business Planning meeting is called “LEAP”. It aims to solve any delivery issues we might have to serve our customers. This is where Sales, Recruitment, Coms and engineers of the GCT’s work in alignment solve all these puzzles in the best way possible for SBP as a whole. We set priorities for recruitment and approve new vacancies. The group meets weekly with Jeroen Borst as Chairman, who also updates the SBP Council on Integrated Business Planning on a weekly basis. The LEAP has set representatives of the G(C)T’s and where needed other colleagues join the meeting.',
        'You can follow the status of the weekly LEAP meeting on this task board: [[Leap Board - Planner]] or follow this slack channel: [[LEAP Slack Channel]].',
      ),
      header('IBP Council', 2, true),
      text(
        'On a monthly basis, SBP as a whole forecasts it’s 15 months revenue forecast AND skill/FTE needs including availability and vacancies. The IBP Council challenges the outcomes of this forecast against profitability and secondly translates this forecast into a Recruitment need for the next 15 months including expected churn of colleagues over time. The output of the Monthly IBP Council is approved in the SBP Council and the FTE outlook (including vacancies) is integral part of our P&L forecast.',
      ),
      header('How do we organize IBP in Schuberg Philis?', 2, true),
      table(
        'How IBP is organized',
        ['Level', 'Responsibility & Purpose'],
        [
          [
            'Customer Team',
            'Customer Team Customer team is responsible for the right configuration of the team. The CT allocates colleagues and vacancies against affordability. This is the basis of customer satisfaction and deliver our own promise.',
          ],
          [
            'GCT AT/ COM meeting',
            'In the GCT AT/ COM meeting the allocation, affordability and profitability of the GCT as a whole is discussed. The GCT concludes on potential internal movements, vacancies and shortages. Also all commercial opportunities are matched with the people needed for this engagement, already early in the sales phase.',
          ],
          ['Weekly IBP LEAP meeting', 'See above'],
          ['Monthly IBP Council', 'See above'],
        ],
      ),
      header('Value Proposition Leadership', 1, true),
      // The VPF Council with leads per sub-proposition (Cloud, Software, Data & AI, Security) drawn on
      // top of the organisation chart (page 35).
      image(
        '/assets/seeds/sbp-odg/value-proposition-leadership.png',
        'Value Proposition Framework Council',
        0.455,
      ),
      text(
        'The Value Proposition council is responsible for the ongoing maintenance and evolution of the value proposition framework. Each sub-proposition (Cloud, Software, Data, Security, VP) has one or more leads who organize multiple dedicated circles. Please note: the group of leaders in sub circles is much larger than just these high level leadership roles. In the next version of this document we will capture these as well. The Value Proposition Framework (VPF) was created as the first deliverable from our strategic Bold Move 1.',
        'The VPF leads meet regularly but not on a fixed schedule. Notes on work-in-progress are shared on the [[#int-vpf-circle]] slack channel. Major new versions of the VPF are shared in the Bi-Monthly.',
        'For more information, please see the [[Value Proposition Framework confluence space]] and a recent version of the framework itself can be found on [[Sharepoint]].',
      ),
      header('Circles as an organizing mechanism', 1, true),
      text(
        'For subjects not covered in the Leadership structures paragraphs above, how do GCTs, Services, Labs and Central Teams work together to serve SBP as a whole? Through circles! Circles are the linking mechanism in SBP. They are how SBP works as a network organization, rather than as a traditional hierarchical organization.',
        'A circle is a group of colleagues who work together on a specific SBP-wide topic. The groups consist of relevant representatives from different Teams, depending on the focus of the circle. The purpose of the circle can vary. For example, the circle can exist for SBP-wide\n• Information sharing about an area of interest.\n• Decision-making about an area of expertise.\n• Achieving specific goals.',
      ),
      // A circle (page 36): colleagues from several GCTs, Services, Labs and Central teams grouped into
      // one circle across the organisation chart.
      image('/assets/seeds/sbp-odg/circle.png', 'A circle across the organisation', 0.272),
      text(
        'Establishing a circle makes explicit to the SBP organization what is happening where and who is involved. Information sharing can serve several purposes, such as sharing context, building a shared vision, exchanging knowledge and experiences, and creating consistency where desirable. The type of decisions to be made depends very much on the topic of the circle. An important example is to align on shared goals and to define how different teams agree to contribute to these goals. Decision-making in circles is governed by advised consent as explained in chapter 3.',
        'Circles are a flexible way to organize cooperation and decision-making across that is explicit, transparent, and accountable. We agree together to give the circles decision-making power. This is intentionally different from traditional methods used by other organizations, where power often resides with a person or a position. Examples of Circles are the Pension Circle and the Python Circle.',
        'New circles can arise by self-organization: a group of colleagues starts a circle around a particular topic or issue because they feel it is important to SBP. Before they create the circle, they use advised consent to design it. The new circle defines their relation to existing circles (to avoid overlaps and gaps) and works out who are the best members. After that the new circle is communicated to the relevant stakeholders.',
        'Circles also stop existing when the members decide so, again following advised consent. While closing the circle, the members make sure that the role of the circle is indeed finished. After that, this update is communicated to everybody else.',
        'We work together to maintain an overview of our [[Circles on confluence]]. Almost all circles also have a (public) slack channel.',
      ),
      header('Referenced documents', 1, false),
      row(
        linkCard('Sales Dialogue info.docx', 'Preparation form for a Commercial Strategy Dialogue'),
        linkCard('Security responsibilities', 'How security responsibilities are split within SBP'),
        linkCard('Security meeting agenda', 'Fixed agenda of the Security Leads meeting'),
      ),
      row(
        linkCard('Business Continuity Plan', 'Crisis Management Team contacts'),
        linkCard('Technology Council and Tech Leads', 'Confluence'),
        linkCard('Quality Management System', 'Comprehensive description of the SBP QMS'),
      ),
      row(
        linkCard('Quality & Risk progress dashboard', 'Dashboard'),
        linkCard('Strategy SharePoint site', 'SharePoint'),
        linkCard('Appraisal Process', 'Confluence'),
      ),
      row(
        linkCard('Coaching within Schuberg Philis', 'Confluence'),
        linkCard('Leap Board - Planner', 'Planner'),
        linkCard('LEAP Slack Channel', 'Slack'),
      ),
      row(
        linkCard('Value Proposition Framework', 'Confluence space'),
        linkCard('Value Proposition Framework (latest version)', 'SharePoint'),
        linkCard('Overview of our Circles', 'Confluence'),
      ),
    ]),
    seedSection('sbp-odg-s3', 'Participation', true, [
      header('Participation at Schuberg Philis', 1, true),
      text(
        'Let’s start at the basis when we talk about our participatory model and culture. When we started the company, we wanted to create this company where we would have super happy customers. To do so we realised we need to build a super happy team. We made a promise to create an organization where we, as Founders, would love to work as “employees” ourselves. For that we needed to come up with new solutions on how to distribute leadership and power, which demands an active involvement of all of us.',
        'So, we see that participation is a fundamental and strategic choice for us. It is fundamental as we believe that without our people fully participating, we cannot be successful. From that perspective it is not surprising that we have many dimensions of participation. Basically, we encourage and invite our colleagues to participate in all aspects of our journey as an organization.',
        'In short, in Schuberg Philis we see the following dimensions of participation (you should read: “in Schuberg Philis I am allowed and invited to contribute to, create new ways to, and lead on”):\n• Collaboration and teamwork\n• Knowledge sharing\n• Continuous Learning and Development\n• Leadership Development\n• Innovation\n• Coaching and Appraisal\n• Cultural and Ethical Engagement\n• Strategic Goals\n• Recognition and Benefits\n• Cross-functional Teams, Circles and Projects\n• Leadership Opportunities\n• Decision making\n• Employee Ownership Plan',
        'As such we make a distinction between regular day to day decisions taking in teams and Big Decisions that affect us all. This starts with having enough information, we therefore strive to be as open and transparent as possible. Since decision making and participation has many dimensions, we added an internal quality control and finally we have defined the arbitrage process in case the decision making needs to be challenged.',
      ),
      header('Decision making is rooted in our Culture', 1, true),
      text(
        'To set the scene for how decision making in our participation works, it is good to look at the most relevant chapters in our Culture and DNA document. The following exact copies of paragraphs of Chapter 2 “Happy Teams”:',
      ),
      callout('quote', {
        title: '',
        body: 'At Schuberg Philis Fairly is an Act of Resistance Against corporate Ugliness.',
        source: '',
      }),
      header('Fair is at the root of our existence (2.1.1)', 2, true),
      text(
        'We wanted to create a company where we (founders) love to work ourselves (as employees). Why? We became thoroughly frustrated with the previous companies we worked for, as they consistently fell short in treating people fairly. This left us feeling unhappy. Being unhappy shouldn’t be part of any company culture.',
        'Fair was our ‘act of resistance’. It is the root. Doing things the way you actually want to do them and make a difference for the better. It is resistance against the existing. Being able to do things differently. Being able to approach things with a different perspective. Being the challenger. This is what fairly actually offers to all of us: progress, challenge, innovate, other perspectives.',
      ),
      header('We appreciate that people are equal and unique (2.1.2)', 2, true),
      text(
        'We are all different. That’s great because combined we become a company powered by hundreds of different talents from different backgrounds, and dreams. But beware, we can only profit from the richness if we treat each other equally. If we fail to do that then we are not only wasting human potential but even worse, making others feel not recognized. Being open-minded is key to this. So, let’s stay open-minded to new people with new points of view. They are a gift to you and the company. And we mean all people, literally everyone in our office. Forget your function title. There is no hierarchy in humanity.',
      ),
      header(
        'Fair Decision making in Teams: Consent based decision-making process (2.1.4.1)',
        2,
        true,
      ),
      text(
        'We seek consent. And we did that long before it became a buzzword. This is not only about democracy; this is about smart people making the best decisions without wasting time wrestling with their egos. Say what you want to say and trust and respect the opinions of others.',
        'In the beginning, we started with a classic majority vote a.k.a. consensus. But we noticed that it didn’t always make the quality of the decision better. There were always ‘losers’ (the minority) who couldn’t commit themselves to the final decision. That’s why we opted for the decision-making model of the “sociocratic circle method”: consent-based decision making.',
        'This method exists high level of the following parts:',
      ),
      process([
        [
          'First someone describes the proposed decision initiative (preferably in writing, beforehand)',
          '',
        ],
        [
          'Opinion-forming round(s), everybody gets to ask clarifying questions and share their opinion, also if you perhaps don’t really like the proposal you can voice that (even if you won’t have a serious objection later, it’s important to voice your thoughts), everybody gets a turn, and everybody listens without interruptions, as you will get your own turn anyway. You can do as much rounds as needed to hear everybody out.',
          '',
        ],
        [
          'Process this round of feedback, and then the question is asked if anybody has a serious objection.',
          '',
        ],
        ['If there are no serious objections, there is consent.', ''],
        [
          'If someone has a serious objection, they can always pull this emergency brake. However, you only do this if you find that the common goal of that specific team and/or Schuberg Philis as a whole is in jeopardy.',
          '',
        ],
        [
          "So even if you don’t really like the proposal you can still have no serious objection and give it your consent. So, it's never just a matter of taste.",
          '',
        ],
      ]),
      text(
        'And beware: if you pull the emergency brake, you also have the obligation to make a new proposal. It might be that one cannot exactly voice or articulate at that very moment why something feels wrong and on feels there is a serious objection, it is possible to ask for a time-out (to for instance a next meeting), to be able to think and articulate (and also propose an amendment to the proposal that would solve this objection).',
        'Even then, or even right away, it could be, the outcome may be that you cannot come to an agreement together right away and then a group of experts is formed (with both sides of the argument) to work out a new proposal that amends the original proposal in a way that it addresses the various serious objections. At the same time, as you know, initiative is rewarded within Schuberg Philis. So, if you bring forward a new proposal, it is by design of the process that it will be taken seriously and not just easily dismissed by saying “no”, if one has a serious objection it needs thorough explanation and the responsibility is with the objector for the proposal to be improved.',
      ),
      header(
        'Advised consent decision making for decisions that impact more stakeholders than the decision-making team (2.1.4.2)',
        2,
        true,
      ),
      text(
        'Sometimes the model above is not enough. When our decisions impact more stakeholders outside the team, we have to seek extra advice. You then have the obligation to seek advice from all relevant stakeholder groups. And you then act on their behalf during a consent round.',
      ),
      header('The best idea wins (2.1.4.3)', 2, true),
      text(
        'We are in the game of winning and doing what serves the customer best. And we all know what it takes to do that: great ideas. So, when we discuss things: we are looking for the best idea. Based on logic and merit and not based on hierarchy. On what contributes best towards a happy customer and a happy team. In line with our core cultural Values. So, if we let the idea be the winner that serves the customer best, then there will be no losers in this company. Ever.',
      ),
      header('Every voice counts (2.3.6)', 2, true),
      text(
        'When we started Schuberg Philis, we wanted to remove every obstacle that could hinder us to make the customer happy. We had seen that happen more than enough in other companies. And we hated it. We are convinced that a team of good people will do the right thing. That’s why we facilitate them so that they can do what is best, based on their knowledge, talent, passion, and drive. To prove it, we made a pretty bold move. We gave each team the mandate to make almost every decision without further governance of the organization. Including financial decisions and teams signing contracts with their customers. We believe in the power of trust. There is nothing more motivational too.',
      ),
      header('Have experts in the lead (2.4.2)', 2, true),
      text(
        "We believe things work best if the experts in their field are in the lead, and there's no unnecessary approval process or someone in a suit intervening. Our experts are part of their teams, and they decide on things themselves, in the context of that team, with consent. We also found that our customers prefer to talk to the real experts directly. It then requires our experts to see the entire context and consider the underlying question: What is the customer's business challenge?",
        "In our teams, multiple experts sit together with great mutual respect for each other's expertise. When you have that, you can trust the outcome. This is the way we believe things should be done properly and effectively. Another myth we dispel is that engineers wouldn’t enjoy talking to customers. In our experience it’s the exact opposite, by talking directly to the customer they get firsthand input and can ask the right questions so we can arrive at better, more sustainable solutions faster.",
        "A genuine expert can explain any complex problem in a simple manner. A semi-expert tends to complicate everything, creating clouds of confusion. If you can't do that, then you are not an expert. Truly skilled experts can explain any complex issue in under two minutes.",
      ),
      header('Leadership is not only top-down or bottom-up (2.6.2)', 2, true),
      text(
        "What we defined already in 2012 in our key values: Leadership. We are all in. Leadership for us is not about hierarchy, top-down or bottom-up, centralized or decentralized. In truth, it's in the whole – in people taking the lead because they care about our shared promises and beliefs. Decisions are made with the active consent of the expert team and all relevant and affected parties. With freedom comes great responsibility.",
        "So, it's really about both “top-down and bottom up”. And we need both, and we need to organize in a way that we get the best out of both. A good example is how we go about with our Value Proposition. Many of the ideas that we get for new services are initiated “bottom-up”. A few people have a good idea and start working on it. They start collaborating and something valuable is created/initiated. Based on real-world experience, usually within one or more customer teams. What we have seen is that it then needs “top-down” support to scale it in a way that all teams can benefit from it in the future. Without some organization and proper attention and support from leadership, it becomes hard for the organization to prioritize/invest in the right things. It is a leadership responsibility to create (just) enough structure and organization so important things get the priority and funding they deserve.",
        "The trick again is to do it together, with respect for each other's role and contribution. And when we focus on the desired outcome, this goes naturally as we usually want the same: to make something better, for our customers, for our teams or for our organization.",
      ),
      header('Decisions are made with all relevant stakeholders (2.6.4)', 2, true),
      text(
        'It’s a responsibility of leadership to ensure that this happens. It starts with recognizing that a decision needs to be made about something. And making sure it happens. We value that someone takes the initiative to get something discussed and on the agenda for decision making. And in organizing decision-making, an involved leader makes sure all relevant stakeholders are included.',
        'Another part of this leadership responsibility is ensuring that we keep our promises once a decision is made. Documenting our decisions and making sure that people deliver on their promises, agreed deliverables, timelines etc. That is also what consent is about. If we take a decision, we also imply that we get it done and that it is a joint responsibility of all people involved to do whatever is necessary to make it happen.',
      ),
      header('Effective Communication and Feedback', 1, true),
      text(
        'In our Participatory culture it is important that Schuberg Philis is as transparent as possible when it comes to sharing information with all colleagues. We believe in the power of constantly challenging ourselves, and that we all share responsibility for the company as a whole. Auditing ourselves means being able to explain everything we do to ourselves and to each other, over and over again.',
        'That is why Schuberg Philis maximises the exchange of information. As much as possible information about the state and decisions of our company is continuously shared in our bi-monthly (including the slidedecks on sharepoint), through the weekly sharing of the Council meeting minutes (on sharepoint), etc etc.',
        'The bi-monthly sets the stage for broad participatory involvement by keeping everyone fully informed about all decisions and factors that influence the direction of the company. In addition to sharing information, it aims to provide space for all colleagues to share, speak and influence the way forward.',
        "Examples of information included in the bi-monthly are:\n• Results, forecasts, and plans on the company's activities and financial situation.\n• Results, forecasts and plans on both sales as recruitment, as well as new hires and leavers every month\n• Information and consultation on decisions that may lead to major changes in work organisation or employment contracts (see later about Big Decisions)",
      ),
      header('Regular Decisions', 1, true),
      text(
        'Regular decisions are "normal" decisions and they do not affect Schuberg Philis as a whole. These are like daily decisions in customer teams, Greater Customer teams, the Council or other circles. Experts in charge as a core principle. Every day, numerous decisions are made according to the Consent and Advised Consent model in all kinds of teams or circles, with different impacts from small to large. Examples include: making and sending proposals to customers, making an offer to a new colleague, scheduling vacations, creating the blueprint for a value proposition, etc. etc. Keeping the decision-making process within the circle of affected stakeholders makes us flexible, fast and decisive. And at the same time we keep everyone on board.',
        'The following table outlines the regular decision classifications at Schuberg Philis:',
      ),
      table(
        'Regular decision classifications',
        ['Scope', 'Involved', 'Decision making method', 'Examples'],
        [
          [
            'A decision that only affects the team itself',
            'Team (can be a Customer team, a Services team or a Central team, etc.)',
            'Consent, by team members',
            'A Commercial proposal to a Customer including deadlines, or a job offer to a candidate',
          ],
          [
            'A decision that affects more stakeholders than just the team itself',
            'Greater Customer Team',
            'Advised Consent, by team members, obligation to seek advice from all relevant stakeholders groups and act on their behalf during a consent round',
            'A customer initiative that will require availability in different time zones',
          ],
          [
            'A decision that is within the mandate of the Council',
            'Council (can be the Schuberg Philis council or any other top-level council)',
            'Consent, by Council members',
            'The budget and program of the Family Day',
          ],
          [
            'A decision that the Council feels it needs expert advice on',
            'Council, involved (greater) teams',
            'Advised Consent, by team members, obligation to seek advice from all relevant stakeholders groups and act on their behalf during a consent round',
            'The strategic initiative to restructure the development of services away from the setup of accelerators',
          ],
        ],
      ),
      header('Big Decisions', 1, true),
      text(
        'The other type of decisions are those that have a significant impact on Schuberg Philis as a whole. We call these Big Decisions. Determining what constitutes "Big" can be somewhat subjective and may depend on a number of factors. In determining what is "Big", we are ultimately guided by the Dutch Works Council Act (WOR), and approach these big decisions with appropriate decision making methods. There are 4 types of Big Decisions each with its own involvement and process:',
      ),
      table(
        'The four types of Big Decisions',
        ['Scope', 'Involved', 'Decision making method', 'Examples'],
        [
          [
            'Big Decisions involving Benefits',
            'Council, Benefits Circle',
            'The Benefits circle can consent on small or subset decisions regarding benefits. Benefit changes impacting the entire company require the Big Decision Process and companywide consent.',
            'Adjustment to indexation policies of our mobility policies. Changing the spendable amount of the working from home store.',
          ],
          [
            'Big Decisions involving Pension',
            'Council, Pension Circle',
            'The Pension circle is a dedicated expert and representation group involved in design and consent for pension plan changes.',
            'New pension plan adaptations 2025-2026. Changes to the insurances.',
          ],
          [
            'Big Decisions subject to “Advice”',
            'Expert Circle, Council, Sounding Board',
            'Consent by Expert Circle and the Council. But with Advice and insights from the Sounding Board. For details see below in 3.7.3',
            'Typically all decisions where normally a Dutch Works Council would be involved for advice. For Example the Purchase of our Office Building, Mergers & Acquisitions, Capital investments, etc.',
          ],
          [
            'Big Decisions subject to “Approval”',
            'Expert Circle, Council, Bi-Monthly',
            'Bi-Monthly consent, using the Bi-Monthly consent process. For details see below in 3.7.4',
            'Typically all decisions where normally a Dutch Works Council would be involved for approval. Changes to our strategic direction, work organisation or employment conditions. For example the changing of our variable bonus into fixed salary, and the Strategy 2030 proposal',
          ],
        ],
      ),
      text('In paragraph 0 we will explain the different processes in more detail.'),
      header('Circles involved in Big Decisions', 1, true),
      header('Expert Circles: the next level of Experts in the lead', 2, true),
      text(
        'As explained in section 3.2.7 we believe everything works best when experts are in the lead. Our experts are part of their teams, and they decide things themselves, in the context of that team, with consent. For ideas that are outside the scope of a single team, these can find their source both "top down" and "bottom up”. A few people might have a good idea and start working on it. They start collaborating, including others, and something valuable is created/initiated. In other cases, leadership / the Council asks a group of experts to work on something that we deem important. In both cases it’s a collaboration of different levels of knowledge, expertise and skills from different teams. These collaborations are called Expert Circles. When an Expert Circle prepares a Big Decision, it is also responsible for organizing its approval. The Expert Circle is responsible for organizing AMAs, bi-monthly presentations, (if applicable) setting up a Sounding Board Circle, and collecting all ideas, suggestions, and objections. They aim to coordinate towards the best decision design that will find consent.',
      ),
      header('Permanent Expert circles: Benefits and Pensions', 2, true),
      text(
        'For two topics of Big Decisions, we have delegated permanent expert circles to represent the Bi- Monthly. Those topics are Pensions and Benefits. This is because those topics really benefit from having expertise and historical awareness. Next to being better equipped to balance the diverse and highly personal interests of the entire company and handle these topics which are considered delicate and require handling with care.',
      ),
      header('The Bi-Monthly', 2, true),
      text(
        'The consent of the Bi-Monthly (meeting) is representative for the involvement of the whole of Schuberg Philis. In sociocratic terms, the Bi-Monthly is the top circle of Schuberg Philis for all Big Decisions subject to Approval (see the types of Big Decisions in section 3.5). For Big Decisions subject to Approval there is an approval process, hereafter referred to as the “Bi-Monthly consent process”.',
      ),
      header('Sounding Board', 2, true),
      text(
        'A Sounding Board Circle is set up to gather reflection and insight for a Big Decision subject to Advice. The Sounding Board Circle follows guidelines in its formation, with members who actively volunteer and together form representation from all the Greater Teams. A Sounding Board Circle is typically limited to 10-15 colleagues to remain effective, and representation follows the consent of the Greater Teams in its formation.',
      ),
      header('Arbitration Circle', 2, true),
      text(
        'The Arbitration Circle is a permanent, inactive circle composed of the members of the Schuberg Philis Council and one representative member from each of the Greater Teams (5 in total), as volunteered and consented to by these Greater Teams. The circle can be activated when someone requests arbitration (see section 3.8).',
      ),
      header('Detailed Big Decision Process descriptions', 1, true),
      text(
        'So how do we handle these Big Decisions? Below you will find a high-level roadmap on the process these Big Decisions follow.',
      ),
      header('Detailed process description Big Decisions involving Benefits', 2, true),
      text(
        'Initiative: The initiative for a decision regarding benefits usually comes from leadership/the Council or the Benefits circle itself. The Benefit Circle is an Expert Circle and Sounding Board in one. They prepare and review the proposals. Therefor experts like the CFO, People lead, MD’s and founder are part of this circle next to a broad representation of the company.',
        'Scope: Typically, all decisions involving benefits, like arrangements for working and rest hours or vacation, a compensation or a promotion policy, changes to the appraisal system. These Big Decisions are mostly subject to approval by the Dutch Works Councils Act (WOR).',
        'Involved Circles: Council, Benefits Circle',
        'Process: When the impact of a decision at hand does not affect most of all colleagues, or impact is considered small:',
      ),
      process([
        [
          'First phase: Consulting and sounding',
          'The Benefits circle consults with relevant stakeholders on the decision and amends the proposal until serious objections have been mitigated.',
        ],
        [
          'The decision can only be taken when consent is found from Council and Benefits Circle.',
          '',
        ],
        [
          'When consent cannot be found the expert circle can invoke an Arbitration process. (see 3.8.3 Arbitration for Big Decisions subject to approval)',
          '',
        ],
      ]),
      text(
        'Process: When a decision at hand affects most of all colleagues and impact is considered large:',
      ),
      process([
        [
          'First phase: Consulting and sounding',
          'the Benefits circle consults with relevant stakeholders on the decision and amends the proposal until serious objections have been mitigated.',
        ],
        [
          'The Benefits Circle starts the “Bi-Monthly consent process” (see 3.7.3 Detailed process description Big Decisions subject to Approval “Bi-Monthly consent process”)',
          '',
        ],
      ]),
      text(
        'Active Since: November 2018',
        'Members: Philip Dries, Kevin Struis, David Dijkhuis, Jeroen Borst, Prashant Tapkhirwala, Marcel de Vroed, Patrick de Zoete (Leaving), Jose Brenninkmeijer (Leaving), Mark van t Kruijs (Leaving)',
        '(Note: The Benefits circle is in the process of selecting new members in the period of November 2024 to February 2025)',
      ),
      header('Detailed process description Big Decisions involving Pensions', 2, true),
      text(
        'Initiative: The initiative for a decision regarding pensions and affiliated income insurance schemes usually comes from leadership/the Council or the Pension circle itself. The Pension Circle is an Expert Circle and Sounding Board in one. They prepare and review the proposals. Therefor experts like the CFO, People Lead and Founder are part of this circle next to a broad representation of the company.',
        'Scope: Typically, all decisions involving pensions, pension insurances, income insurances, additional disability benefits, or pension accrual during sickness. These Big Decisions are all subject to approval by the Dutch Works Councils Act (WOR).',
        'Involved Circles: Council, Pension Circle',
        'Process: Typically, these decisions require a great deal of expertise and are prepared by the Pension Circle involving all necessary expertise for this complex matter.',
      ),
      process([
        [
          'First phase: Consulting and sounding',
          'The Pension circle consults with relevant stakeholders on the decision and amends the proposal until serious objections have been mitigated.',
        ],
        [
          'The decision can only be taken when consent is found from Council and Pension Circle.',
          '',
        ],
        [
          'When consent cannot be found the Arbitration Circle can be activated and involved. (see 3.8.3 Arbitration for Big Decisions subject to approval)',
          '',
        ],
      ]),
      text(
        'Active Since: 2010',
        'Members: (per July 2024) Willem Jan van den Brekel, Sven Hazejager, Sander Verloop, Giel Hermans, Kim van Wilgen, Karin Baars, Elena Todorovska, Christophe Vico, Prathamesh Panchal, David Dijkhuis, Kevin Struis, Arjan Eriks, Philip Dries',
      ),
      header(
        'Detailed process description Big Decisions subject to Advice “Sounding board advice process”',
        2,
        true,
      ),
      text(
        'Initiative: The initiative for such decision usually comes from leadership/the Council. An Expert circle is initiated on their request that prepares the proposal.',
        'Scope: Typically all decisions where normally a Dutch Works Council would be involved for Advice. For Example: the Purchase of our Office Building, Mergers & Acquisitions, Capital investments, etc.',
        'Involved Circles: Council, Expert Circle, Sounding board',
        'Process: Specific for Big Decisions subject to advice, a Sounding Board will be requested from the Bi-Monthly by the Expert Circle. The essence of the sounding board process is a two step process:',
      ),
      process([
        [
          'First phase: Consulting and sounding',
          'The expert circle consults with the sounding board on the decision or proposed decision before the decision is taken. The expert circle can take the insights and recommendations into consideration while it is busy with the subject at hand.',
        ],
        [
          'Second phase: Asking for advice',
          'as soon as the Expert Circle has formulated its proposed decision it will ask the sounding board for Advice.',
        ],
        [
          'If the advice is positive the decision then will be made by the expert circle and the council.',
          '',
        ],
        [
          'If the advice is negative the expert circle may or may not decide to adjust or amend the proposal to align it with the advice of the sounding board.',
          '',
        ],
        ['Ultimately the decision is then made by the Expert Circle and the Council', ''],
        [
          'If the Sounding board is of the opinion their advice has not been properly taken into account, they can activate and involve the Arbitration Circle (see section 3.8).',
          '',
        ],
      ]),
      header(
        'Detailed process description Big Decisions subject to Approval “Bi-Monthly consent process”',
        2,
        true,
      ),
      text(
        'Initiative: The initiative for such decision usually comes from leadership/the Council. An Expert circle is initiated on their request that prepares the proposal.',
        'Scope: Typically all decisions where normally a Dutch Works Council would be involved for Approval. For Example: Changes to our strategic direction, work organisation or employment condition, like the changing of our variable bonus into fixed salary, and the Strategy 2030 proposal.',
        'Involved Circles: Council, Expert Circle, Bi-Monthly',
        'Process: Specific to the Bi-Monthly consent process is that we look for Consent of the whole of Schuberg Philis. This requires that we bring everybody in a position to give their consent on as much information as colleagues may require. To that extend the Expert Circle:',
      ),
      process([
        [
          'Formulates its proposal and presents it in the Bi-Monthly meeting (or if there is a time constraint it communicates the proposal by mail and slack to everyone)',
          '',
        ],
        [
          'It then organizes at least two AMA sessions',
          'These sessions are open for every colleague. During those sessions the proposal of the Expert Circle is discussed. If you are ok with the proposal, you do not have to join an AMA. Questions can be asked to better understand the proposal, suggestions and concerns can be shared to improve the proposal and (serious) objections can be raised.',
        ],
        [
          'The intention is to address concerns and (serious) objections during the session and if needed, the proposal can be adjusted to resolve serious objections.',
          '',
        ],
        [
          'If that cannot be done during the sessions the Expert Circle will adjust the proposal after the session and check with the colleagues who raised the serious objections.',
          '',
        ],
        [
          'At the end of an AMA the Expert Circle will ask the participants if consent can be given to the proposal. If a serious objection has been raised the Expert Circle will ask for consent with the condition precedent that the serious objection is resolved in the adjusted proposal.',
          '',
        ],
        [
          'During the next Bi-Monthly meeting the proposal and consent is addressed, and the decision will be registered in the next meeting minutes of the Council.',
          '',
        ],
        [
          'If consent cannot be reached the Arbitration Circle can be activated by the Expert circle (see section 3.8)',
          '',
        ],
      ]),
      header('Arbitration', 1, true),
      callout('note', {
        title: 'Important Note',
        body: 'In the first twenty years of Schuberg Philis, we have never actually needed Arbitration. Our unique collaborative culture has guided us through difficult decisions in an inclusive and fair way. We aim to actually never need the Arbitration process and Circle. However, we do see the value of a described methodology and process if we would actually need it. The Arbitration Circle process is there just to make sure there is a (legal) escalation path should that be ever needed. But let’s focus on actually agree with consent and come up with proposals that we all can live with!',
        source: '',
      }),
      header('Arbitration Circle', 2, true),
      text(
        'The Arbitration Circle can be activated and involved for cases related to Big Decisions subject to approval and Big Decisions subject to advice. The arbitration Circle will have a different role for these two Big Decisions.',
      ),
      header('Arbitration for Big Decisions subject to Advice', 2, true),
      text(
        'A Sounding Board, although not involved in the consent to a major decision subject to advice, may object to the way advice is incorporated in a decision drafted by an Expert Circle. For example, because they have serious objections to the decision. The Sounding Board can then activate and involve the Arbitration Circle. The Arbitration Circle is not the top circle for these matters, since the decision at hand is subject to the consent of the Expert Circle and the Council. However, the Arbitration Circle will assist the Sounding Board in the final settlement of the dispute.',
        'The role and path of the arbitration circle:',
      ),
      process([
        [
          'Internal mediation',
          'Two members of the Arbitration Circle are brought in to help the team or circle attempt to resolve the serious objections to a Big Decision that the team or circle cannot resolve.',
        ],
        [
          'If this is not sufficient, another round of mediation can be requested, now also with an external expert (see: External expertise).',
          '',
        ],
        [
          'If the serious objection is not resolved within the content of the decision at hand, this is where it stops. As the decision at hand is subject to advice, the Council and the Expert Circle make the final decision.',
          '',
        ],
        [
          'If, however, a dispute remains where the Sounding Board feels that the decision at hand does not follow the process of participation at Schuberg Philis and as such does not follow the Workers Council Act (WOR) or other laws, the Arbitration Circle will support the Sounding Board Circle with legal means, expertise and resources to bring this for arbitration before the relevant court.',
          '',
        ],
      ]),
      header('Arbitration for Big Decisions subject to approval', 2, true),
      text(
        'In the case of disputes over bimonthly decisions (a.k.a. Big Decisions subject to approval) that cannot be resolved through the basic Big Decision process, the Arbitration Circle can be activated and involved (by a member of the Bi-Monthly) and ultimately has the role of the top circle. But only after the Arbitration Circle has validated that all means of reaching consent have been exhausted.',
        'The role and the path that the Arbitration Circle will take:',
      ),
      process([
        [
          'Internal mediation',
          'Two members of the Arbitration circle are brought in to help the team or circle try to resolve the serious objections to a Big Decision that the team or circle cannot resolve.',
        ],
        [
          'If this is not sufficient, another round of mediation can be requested, now also with an external expert (see: External expertise).',
          '',
        ],
        [
          'When these steps did not resolve the serious objections for Big Decisions that are subject to approval, the Arbitration Circle can make the final decision.',
          '',
        ],
      ]),
      text(
        'If, however, a dispute remains that the decision at hand does not follow the process of participation at Schuberg Philis and as such does not follow the Workers Council Act (WOR) or other laws, the Arbitration Circle will support with legal means, expertise and resources to bring this for arbitration before the relevant court.',
      ),
      header('External expertise from Sociocratic Centre Netherlands', 2, true),
      text(
        'Schuberg Philis has an agreement with Pieter van der Meché (Director of the Sociocratic Center Netherlands (SCN)) to act as our external expert when requested for by the Arbitration Circle. Pieter has extensive knowledge on the WOR, the Sociocracy methodology and the implementation of participation within Schuberg Philis. He can help the Arbitration Circle in steps 2, 3 and 4 with knowledge of and experience with participatory guidance, sociocratic mediation and sociocratic process arbitration.',
      ),
      header('External Legal Arbitration', 2, true),
      text(
        'If the dispute remains and involves a disagreement on the content of a decision, the dispute can ultimately be brought before the Enterprise Chamber (Ondernemingskamer) or a sub-district court (Kantonrechter). The Arbitration Circle will have access to Schuberg Philis resources to facilitate this process with external expertise and legal expertise.',
      ),
      header('Exemption from the Obligation to Establish a Works Council', 2, true),
      text(
        'In accordance with the Dutch Works Councils Act (Wet op de Ondernemingsraden, WOR), companies may request an exemption from the obligation to establish a Works Council in cases of exceptional circumstances. Our organization has been granted such an exemption for at least 3 years on October 17th of 2024 by the Social and Economic Council (SER) on the basis that employee participation and consultation rights are ensured through our alternative unique participation model as described in this Chapter.',
      ),
      header('Quality Assurance on participation', 1, true),
      header('Audit Team', 2, true),
      text(
        "The Schuberg Philis Audit Team consists of audit and compliance professionals. As such, their role is to provide a critical oversight mechanism to ensure that Big Decisions are made in accordance with this document. The Audit Team will produce an annual report summarizing its findings and assessment of the quality of the Big Decision processes. This report serves as a comprehensive overview of the organization's compliance with participation procedures and highlights areas of strength and areas for improvement.",
      ),
      header('Employee Ownership plan', 1, true),
      text(
        'So, this chapter is about Participation in SBP. This was taken quite literally by creating actual ownership of SBP of all of us via the Employee Ownership Plan (EOP). This initiative has started in 2019 as a heart-felt wish of the Founders to share more ‘intrapreneurship’ and increase financial awareness in SBP to facilitate sharing profit and risks in the longer term with the whole team. The EOP was also a long-term desire by many of our colleagues.',
        'The Horizon project entailed the transition of capital and ownership of Schuberg Philis, as Pim Berger, one of the three Founders had decided to step out of Schuberg Philis due to health reasons. Please refer to what was discussed in the Bi-Monthly of 23-05-2024 for the specifics of this change of capital and ownership and thus 2024 EOP in the light of the Horizon project ([[Slides]], [[Recording]]). All colleagues have had the chance to participate in the new Schuberg Philis EOP that is implemented on January 14th via a roll over from the former EOP. Please watch this [[link to the Extra Bi-Monthly on EOP]] on 18-11-2024 or slack [[# ama-eop2024]] for more information. With the transition to Bridgepoint as a majority shareholder, the ‘old’ Employee Ownership Plan was terminated.',
        'The reasons to want an Employee Ownership Plan are still very much alive, for both Schuberg Philis and Bridgepoint. We plan to design a new Employee Ownership Plan, also to see how we can accommodate new joiners in the future. We will discuss updates on the new Employee Ownership Plan in the bi-monthly, as usual.',
      ),
      header('Legal Governance', 1, true),
      header('Legal governance', 2, true),
      text(
        'SBP is established as a private limited company (besloten vennootschap in Dutch). This means that by law, it has shareholders (see 3.11.2 (a), it has one or more statutory directors, and it has Articles of Association by which the governance between shareholders and statutory director(s) is determined. For SBP, the shareholders have appointed Gerwin Schuring, Philip Dries and David Dijkhuis (via PPG Holding B.V.) as its statutory directors. In turn, they have granted the formal right to represent SBP in entering into agreements with third parties to several colleagues who are typically engaged in such agreements (like COMs, MDs and Sales). These formal rights are registered with the Chamber of Commerce (Kamer van Koophandel in Dutch) and subject to restrictions, most notably that agreements must be signed by (at least) two officially registered colleagues.',
      ),
      header('Formal Leadership & Governance of Schuberg Philis', 2, true),
      text(
        'As of January 14th 2025, Bridgepoint is the majority shareholder of Schuberg Philis. SBP has two remaining Founders: Philip Dries and Gerwin Schuring. Together with our CFO David Dijkhuis, they are also referred to as “GPD”. GPD have two roles in the formal governance of SBP: (a) as shareholders; (b) as members of the Board together with Bridgepoint (or “SBP Board of Directors”).',
        '(a) GPD have been SBP shareholders from the start of the collaboration with Bridgepoint. Bridgepoint is the major shareholder, with approximately 65% of the shares. Philip and Gerwin own approximately 25% of SBP. The remaining of about 10% of the company is owned by their SBP colleagues, through certificates.',
        '(b) This joint collaboration by Bridgepoint and Schuberg Philis is organized in the SBP Board of Directors (within the “highest” legal entity Nephele I BV), consisting of 7 seats. Schuberg Philis holds 3 executive seats with GPD. Executive seats mean that they are concerned with the daily business of SBP. Bridgepoint holds 3 non-executive seats with Olivier van Riet Paap, Ronald Kolk and 1 other person (likely to be an industry expert). The seventh seat will be an independent, non-executive chairman, chosen by GPD. The Board of Directors governance rights are laid out in the Articles of Association, which include the appointment of the statutory director(s) (at this point GPD), and making decisions regarding the equity of SBP (e.g. issuance of shares, alienation of shares, declaration of dividends).',
        'Reserved matters - please observe that for certain big decisions regardless of which participation process has been followed, Board of Directors approval maybe required. This follows both from the law as well as the shareholder agreement (“SHA”) between GPD and Bridgepoint. Examples include dividend, EOP, capital investments and the annual budget. Within the Council GPD will monitor whether Board of Directors approval is necessary or not, and organize this approval if so.',
      ),
      header('Financially we are one SBP', 2, true),
      text(
        'Normally you would not expect a chapter on financials in a description of an organization. And no worries, this is not a full description of our financial system, and it will not take long.',
        'The reason to add a little bit of finance in this organizational story, is that the way financials are organized in a company does tell a lot about the way it is organized. Better yet, the way financials are organized typically creates strong incentives to behave accordingly, so it is important that the financials are aligned with the organization, and vice versa. It is relevant to know that SBP stresses the importance of “One SBP.” The way we organize our work is through teams, Greater Teams, and circles. But the goal is for everyone to make SBP better as a whole, to have happy customers, and to enjoy working at SBP. That means that we are eager to help each other out when necessary and/or possible. That also means that in assessing our financials, we primarily focus on the overall picture, not on the parts. We have GCTs for the reasons described in Chapter 4, not to create any competition between them, or to reward them depending on the results. This is the reason we do not call them “business units”. In practice this means, for example, that we typically only present financial figures for SBP as a whole. And that nobody in SBP gets financially incentivized with a bonus for individual financial results, for specific financial team results or specific financial Greater Team results.',
        'We do create financial information about our teams and our Greater Teams. The reason for this is to help each other understand what is going on financially in those teams, in order to understand the build-up of the total and to assess the situation of these teams. Each team can follow its financials with our reporting tool Tableau, based on information stored in our ERP system AFAS.',
      ),
      header('Internal Authorization scheme and Chamber of Commerce (KvK)', 2, true),
      text(
        'We have a strong belief that our colleagues should be enabled to do what is necessary for SBP and our customers, also financially. Therefore, we have a broad group of people that have permission to participate in legal buying and selling arrangements. This means that all Customer Sales Directors, Customer Delivery Directors, Managing Directors, Services Directors and Founders are enlisted in the Chamber of Commerce. We have made a choice that nobody can sign an agreement on their own was we believe in the four eyes principle. The details of who can sign what can be found in the [[Authorization Scheme]].',
        'We ask you to sign the SBP oath when you get to be enlisted in the Chamber of Commerce, as this responsibility goes hand in hand with our basic principles that is set in the SBP oath:',
      ),
      callout('quote', {
        title: 'SBP oath',
        body: 'As a member of the Schuberg Philis family and leadership team I understand the (additional financial) responsibility when signing contracts and deals (MSA’s, SO’s and PO’s) on behalf of the organization;\n• I only do deals that I really understand;\n• I only do deals that make sense (not only financial but in line with all SBP values, mission, vision, and strategy. As an easy first check: does this deal make our customers and team happier?;\n• If we don’t see the “win/win” we should not do the deal, even if there is a short-term gain for SBP;\n• I will always seek consent with my team(s);\n• I will go the extra mile in making sure we-do-the-best-deal-possible (100% also means that we "fight" for a good deal. And we “fight smart” and put all our charm to it ;-));\n• I will always think if I would “spend the money” if it was just for myself”;\n• I will adhere to all external and internal agreements listed in the document [["Authorization Scheme"]].',
        source: '',
      }),
      header('Referenced documents', 1, false),
      row(
        linkCard('Bi-Monthly 23-05-2024: slides', 'SharePoint'),
        linkCard('Bi-Monthly 23-05-2024: recording', 'Recording'),
        linkCard('Extra Bi-Monthly on EOP, 18-11-2024', 'Recording'),
      ),
      row(linkCard('# ama-eop2024', 'Slack'), linkCard('Authorization Scheme', 'Document')),
    ]),
    seedSection('sbp-odg-s4', 'Leadership behaviour', true, [
      header('Involved leadership', 1, true),
      text(
        'The preceding chapters have said a lot about how leadership is practically organized. In this chapter we describe how our leaders actually work with and within that organization. The main expectations on leadership behaviour at Schuberg Philis are in our Culture and DNA document. Leadership is mentioned many times in that document. The concept of “involved leadership” is especially crucial. So, the following is an extract from Chapter 2 of “Happy Teams” – “Involved leadership”:',
      ),
      callout('quote', {
        title: 'Leadership is crucial – we are all in.',
        body: 'Our starting point was to create teams with all the skills and mandate needed to make the customer super happy. So, in every team we (still) have all necessary engineers, and all other roles needed to deliver on our promises. We introduced roles like COMs and Sales (Now Customer Director Delivery and Customer Director Sales), and one of the founders was always part of a team (now MDs are). Later we added Security Leads, Technology leads, Consultants, etc.\n\nOne of the pitfalls with “Manager” type of roles, is that they are becoming more “process oriented” rather than focused on the actual job to be done in the team. With “Involved Leadership” we mean that, although you may have a leadership role and we ask you to (also) see the overall picture, we want you to be super focused on the actual job to be done in the team. We value that you know things by heart (top of your head knowledge). Whether it is the status of a Service Order, the timings in a project planning or the technical concept of the solution we propose to the customer. We expect you to know these things, so you can actively contribute and steer towards the desired outcome. Even more so, we see that the great leaders in Schuberg Philis combine “knowing things” with an actual passion for the stuff they take care of. Inspiration starts when leaders lead, leading means: you go first. Whether it is a passion for a certain tech, design, science, experimentation or even software license management! If you actually don’t really care about anything that we do, it will be hard to inspire anyone!\n\nWith involved leadership we avoid middle managers in ivory towers, decisions that are postponed, unreliable forecasts, bureaucracy, and all other symptoms of when people are not really involved.\n\nThere\'s an enduring misconception that involvement leads to inefficiency because "you are so busy with all these details that it consumes you”. The opposite is true: when you\'re truly involved, you can act and steer immediately. It saves so much time. In fact, "having others to worry about daily operations” requires so much more inefficient frequent communication and overhead it will make things viscous and unclear.\n\nInvolved leadership does require some special skills. To name a few: you must be able to zoom in and out constantly. Look at the big picture and avoid micro-management. Showing, not just telling, is equally important. Leading by example. And, as soon as you see someone capable of taking over, you step aside, and you lift them up on the shield. Giving your people maximum space while also saving them from drowning. Steering alongside by playing along, this also creates this truly collaborate spirit that we see in so many high performing SBP teams. Truly together.',
        source: 'Culture and DNA document, chapter 2 “Happy Teams” – “Involved leadership”',
      }),
      header('Be true to what you believe in (2.6.1)', 2, true),
      text(
        "If you're afraid of every discussion because it undermines your leadership, then you probably don't fit with us. You must be willing to fight for your ideas and beliefs. It starts with each of us, including you. But when you do that, we guarantee, you're actually never do it alone. When we are true to our beliefs and are willing to discuss and align on them, that is when the power of collaboration shows. We all want to believe in the things we do, and good teams in the end agree with active consent and inspired hearts!",
      ),
      header('Leadership is not only top-down or bottom-up (2.6.2)', 2, true),
      text(
        "What we defined already in 2012 in our key values: Leadership. We are all in. Leadership for us is not about hierarchy, top-down or bottom-up, centralized or decentralized. In truth, it's in the whole - in people taking the lead because they care about our shared promises and beliefs. Decisions are made with the active consent of the expert team and all relevant and affected parties. With freedom comes great responsibility.",
        "So, it's really about both “top-down and bottom up”. And we need both, and we need to organize in a way that we get the best out of both. A good example is how we go about with our Value Proposition. Many of the ideas that we get for new services are initiated “bottom-up”. A few people have a good idea and start working on it. They start collaborating and something valuable is created/initiated. Based on real-world experience, usually within one or more customer teams. What we have seen is that it then needs “top-down” support to scale it in a way that all teams can benefit from it in the future. Without some organization and proper attention and support from leadership, it becomes hard for the organization to prioritize/invest in the right things. It is a leadership responsibility to create (just) enough structure and organization so important things get the priority and funding they deserve.",
        "The trick again is to do it together, with respect for each other's role and contribution. And when we focus on the desired outcome, this goes naturally as we usually want the same: to make something better, for our customers, for our teams or for our organization.",
      ),
      header('Freedom & Responsibility (2.6.3)', 2, true),
      text(
        'These are interconnected: one is worthless without the other. They come hand in hand.',
        'Freedom might be the greatest gift you can give to people. Granting freedom says: I take you seriously.',
        'And what we then ask for is to take yourself super seriously, too. As well as your team members. And customers. And the organization. And thus, take full responsibility for it. And what it means to take responsibility? In the end it is quite simple: you do what it takes to get it done. Whatever it is. Sometimes it means you have to lie awake at night thinking about it. How to solve the puzzle in your head. Sometimes it means you have to get the people in the team around the table to get a conversation going that is way overdue. Sometimes it means you have to open up that you need help. Taking responsibility is an act of leadership. “I got this”.',
        "Part of our culture is that we don’t believe in rules. Because the basis of a lot of rules is mistrust. And trust is the basis of who we are: we fundamentally trust each other. So, as an easy example, we've abolished the system we used to register and approve vacation days as it feels not right if we would not trust you on that. We leave it up to you to handle that appropriately and responsibly. Mature—as we trust you with much bigger “real responsibilities”.",
        'If someone interprets this as "I have unlimited vacation days," they\'ve only grasped half of our message. Got it?',
      ),
      header('Decisions are made with all relevant stakeholders (2.6.4)', 2, true),
      text(
        'It’s a responsibility of leadership to ensure that this happens. It starts with recognizing that a decision needs to be made about something. And making sure it happens. We value that someone takes the initiative to get something discussed and on the agenda for decision making. And in organizing decision-making, an involved leader makes sure all relevant stakeholders are included.',
        'Another part of this leadership responsibility is ensuring that we keep our promises once a decision is made. Documenting our decisions and making sure that people deliver on their promises, agreed deliverables, timelines etc. That is also what consent is about. If we take a decision, we also imply that we get it done and that it is a joint responsibility of all people involved to do whatever is necessary to make it happen. As an example: when we agree in a Customer Team meeting about something, we expect that the chair of the meeting (often the COM) makes sure it gets noted down including the milestone and deadline and makes sure it comes back on the agenda of future Customer Team meetings, checks regularly with the relevant action holders about progress and holds them accountable or escalates when necessary.',
      ),
      header('High value team meetings (2.6.5)', 2, true),
      text(
        'The moments when the entire team comes together are essential for our model. We have to make sure we take time together for listening, discussing, deliberating, aligning. Here we jointly decide on what we are going to do, how we are going to do it and who does what. Always with the reference of the camaraderie around the kitchen table in mind.',
        "As these are meetings with a lot of people, and we want them to be high energy, they need to be prepared well and involved in the right way. With an agenda that is clear for everyone, created based on relevant and well-prepared input from everyone. With written proposals for decision making. With an up-to-date action list and a way to catch up for people not present (e.g. through meeting minutes or a recording of the meeting). It's a leadership responsibility that meetings are led properly. High energy, effective, efficient, and fun.",
      ),
      header(
        'Involved means the whole team meets regularly to jointly decide on everything',
        3,
        true,
      ),
      text(
        'There was a time when sub-meetings were organized because engineers were getting bored with certain topics. Sales and COMs thought let’s give these guys a break. Thus, so-called “Account Team” meetings were born that way. And quickly, the misunderstanding arose that the “Account Team meetings” were more important than team meetings and decisions could be made there. Decisions that belonged in team meetings. Engineers felt overlooked and excluded. So, in sub meetings you can prepare proposals, but important decisions like: “we want to offer this project with this ambitious timeline to the customer” need to be made with the whole team, by consent, so we all feel (and are!) part of what we do.',
        'It is a leadership responsibility to make sure these meetings actually happen, all things get discussed, and everybody’s voice is heard.',
      ),
      header('We steer, prioritize, decide actively together', 3, true),
      text(
        'Leadership ensures that everything relevant makes it onto the agenda. This also involves safeguarding more difficult topics like team dynamics if that is an issue. Making sure that everyone feels that absolutely everything can be discussed. And ensuring that everyone has a chance to speak.',
      ),
      callout('anecdote', {
        title: 'Put the responsibility where it belongs - with the entire customer team',
        body: "About 1.5 weeks before the delivery of a big project, the deadline was at stake for a customer project, and lots of discussions were going on within the engineering team on how to make it possible.\n\nThe deal with the customer was clear: if we would deliver late, Schuberg Philis would have to pay some money for every day late. But also the opposite: for every day too soon, we would get a bonus.\n\nPhilip (at that time our Director of Operations) pulled in the whole customer team into the room to discuss how we could deliver up to our promise of time and quality. There was still ascension day and a weekend in between us and the deadline... And Philip just put it on the table: 'Whatever you decide, I will support you. Even if it does mean we're delivering a few days late; I don't want to force you all in something you do not feel comfortable with. You have already worked very hard, and I can totally imagine you all need a break on this one'. Philip knew upfront it never ends with a deadline of a project; you need the team to continue after the deadline with the results of the project. Keeping the team healthy was more important than a short-term date.\n\nThis 'appeal to be a happy team first’ and putting the actual responsibility into the hands who deliver the promise, triggered an interesting response from the engineering team. When discussing that we as engineers would be supported by Philip to be allowed to deliver later, the actual engineering response was 'but not on my watch'.\n\nBy the end of the meeting, engineers not only gave their consent to work on ascension day and the following weekend, but all mental roadblocks were removed, and a fix-forward plan was drawn.\n\nThe project was delivered a week after that all-hands meeting; even a few days ahead of the planned deadline. The result: a customer team who was proud on the early delivery of the project, and a customer who gladly paid the bonus to Schuberg Philis. Which was 100% passed on to the engineering team, at their disposal. Which we used to finally get a decent coffee machine (our first real espresso machine!), some game consoles, a football table and a decent beer tap system...\n\nWhat we learned: that it absolutely makes sense to let the customer team decide on everything, including the balance act between what we can, what we promise, and what the consequences are.",
        source: '',
      }),
      header('Involved means we are all steering towards the same goals (2.6.6)', 2, true),
      text(
        'That means that we have set these goals in a plan together.',
        'At the foundation, we believe it’s crucial that every team member feels they can influence the course of their team. The decision to join a team because you want to, is actually already an important part of influencing the course of the Customer team. And after that, we believe that good teams spend time together to think about and formulate their new (joint) goals (as there is a new team member that brings new views and goals to the table), and how they think they want to reach them. So that these goals are the goals of the individual team members.',
        'A nice way to understand the dynamics of team going through different phases is the Tuckman model that teams can use as a guide. (Forming, Storming, Norming and Performing). These models are great but please keep on thinking yourself: in the end it is about making sure everybody is aligned and that we decide with consent together. So that we can feel connected to our team and want to fight to reach our goals.',
      ),
      header('Involved means direct involvement (2.6.7)', 2, true),
      text(
        'Leadership knows what’s going on. If you have to say: ‘I don’t know, let me check with the team’ too often: you clearly don’t. And the goal is not (just) to know. The goal is to know, so you can actively contribute and help to get things done. If you do not know what the crucial deliverables are or what is on the critical path, how can you lead?',
        'It’s also why leaders are called leaders: they go first. How can you go first if you do not know where to go?',
      ),
      header('Leadership is ‘ego-less’ (2.6.8)', 2, true),
      text(
        "Fully ego-less does probably not really exist. We are all humans. It’s just that we need to be aware of when there is a conflict of interest. And then there is a simple checklist where to put yourself or your own interest:\n• After our organization's interest.\n• After our customer's interest.\n• After the team's interest.",
      ),
      header(
        'Catch all: the balancing act between the bigger picture and the urge to micromanage every detail (2.6.9)',
        2,
        true,
      ),
      text(
        'The art of focusing on the details that matter.',
        'There are two sides to this:\n1. How do I give enough space for the people around me to learn the job that I already master?\n2. What are the actual details that matter in this project/case/document etc.?',
        'To begin with 2: In a way, being a company with a 100% mindset, you could say all details matter. And they do. But that does not really help when we want to coach people to take responsibility of things. It is better to prioritize details based on the impact they could have when left unmanaged. And then it becomes quite easy. If needed, you can add “Urgency” or “how quickly will this become a problem” to assess further.',
        'On 1. So, for the things that you think are crucial to be properly managed, it is worth sitting down with the people that you are leading to properly discuss the importance of them beforehand, so they can take them into account into their planning / deliverables. The trick is to do it in a way that gives enough room to do it in the way they actually like to do it. And then keep an eye on progress in an appreciative way. So, it’s actually fun to update you on progress.',
        'The organization and our work improve only when we, as leaders, provide space for others to learn. So, not overloading someone beforehand before they go into an important steering group but doing so afterwards by showing interest and asking: how did it go?',
        'Constantly ask yourself: what makes the most sense for the organization? But also zoom out and take time for yourself: what am I going to do? And what not? Saying no is often better than saying a half hesitating yes to everything. This gives focus.',
        "For those who occasionally struggle with this – and who doesn't? – consult with your coach. Being willing to ask for help or advice is a sign of strength. What are the things you see in my schedule that I actually should not be doing is a great question to start the conversation.",
      ),
      header('Leadership is about creating a consistent environment (2.6.10)', 2, true),
      text(
        'It’s about making sure we act in line with our guiding beliefs and DNA. It’s a leadership responsibility there is no delta between “the brochure” and real life. Now and in the future.',
        'Creating a consistent environment is one of the most important prerequisites for success. Someone who changes objectives daily will never achieve those objectives.',
        'Make sure the team sets goals and deliverables (that what we call a plan), review them periodically, and create smart reports. This creates calmness and ensures focus. With teams that struggle to make plans themselves, it means you have to lead: create the plan and involve the team and ask input after an initial version with a structure including all the chapters that you think are crucial, already designed. Then you help a team, instead of just saying: where is the plan?',
        'Provide your team with guidelines and direction without them losing freedom. Inspire them to perform. Have no meeting without an agenda. Have no meeting without an action list. As this is just a waste of time. Being consistent means having confidence in the path you’ve chosen.',
        'And to be sure, this leadership is also very focused towards the customer: lead and set up customer meetings, we lead in drafting an agenda, preparing a deck if required/needed, make minutes, etc.',
      ),
      header('We are responsible. We act as owners. (2.6.11)', 2, true),
      text(
        'We have always exhibited ownership even before we became an employee-owned company. Taking complete ownership of what we do is ingrained in our culture. For customers, colleagues, our environment, the people around us, and the commitments we make to our customers.',
        'But ownership is also in the details: like leaving a meeting room tidy and putting our coffee mugs in the pantry. And we spend every Euro as if it were our own (oh it is actually! ;-))',
        "Ownership means that we go further in our commitment than anyone else. In a typical implementation project, there are at least ten moments when a customer does something wrong, or as very often happens: the customer does not deliver a deliverable on time. When our response could be (and most of our competitors actually gladly do): Thank you Mr. Customer, unfortunately, now because of this we cannot make our deadline anymore. So, everything shifts. But that's not what we want to be. In the end we want to be successful for (and with our customer).",
        "So, what we do: we also take responsibility for the Customers (sub) deliverables. Not by actually doing them, but by making sure the customer in a very early stage understands what’s required of them. We help them describe their deliverables, by coaching them on how to plan them, cut them up in smaller parts or sub deliverables so we have visibility on progress and status early on. We include their deliverables in our reporting. We spend time on them in every project or board meeting. We explain the importance of them to our (overall) planning. We escalate early when we see issues. This sense of ownership is (in the long run) experienced as extremely pleasant. Doing what is necessary, not hiding behind excuses or externalizing issues. And remember; we're in the game to achieve a 9. Not to find excuses.",
        "We don't do this only for the customer, but just as much to please ourselves. If we were to align ourselves too much with the customer's world, we would be very unhappy. Striving for excellence is what truly makes us unique. The business side of the customer is always thrilled with us, the IT side not always. Sorry guys for sometimes being a pain in the ass. But in the end, we make them shine too.",
        "We have never – let this sink in for a moment – never failed to deliver a project in our history. On 95% of them on time and budget. That's unprecedented in our market.",
      ),
      callout('anecdote', {
        title: 'Anecdote',
        body: 'We were at a project kick-off meeting with Bol.com. We were working on the implementation project with a very tight deadline because of Sinterklaas and Christmas coming up, and the CIO of Bol.com stated to the members of his organization that: “this is the currently projected go-live date”. In the context of Bol.com this meant: “we always start with an ambitious deadline, but we all know it is going to shift” (at that time it turned they actually thought that they would have to push the go-live forward with at least three months, so it would be after Sinterklaas and Christmas). At that point Gerwin stood up and said:” For us, and we hope we can agree on this together, this is the we-are-going-to-do-whatever-it-takes-to get-it-done-no-stones-unturned deadline. We will go live before your most important holiday season”.\n\nIt turned out to indeed be a super challenging project, with many curveballs for both bol.com and us, but we did deliver and before the holiday season.',
        source: '',
      }),
      text(
        'It starts with ensuring that you fulfil your own promises. Then, take responsibility for everything that actually happens beyond your control. Although theoretically impossible, we strive to still do so. No commenting from the sideline. A leader must exemplify this or ensure that someone steps in if they notice this happening. We are Schuberg Philis, and we step in, always. And of course, be aware that we stay away from taking responsibility to actually deliver customer deliverables silently. Make sure we formally sign off on these things. And we should also always conditionally help: if we need extra budget or anything else, make the customer aware at an early stage and agree on that.',
        'Another example of our responsible attitude is that everyone in Schuberg Philis that can financially represent the company (Sales, Coms, MD’s, Directors etc.) are asked to commit to the following “oath”:',
      ),
      callout('quote', {
        title: 'SBP oath',
        body: 'As a member of the Schuberg Philis family and leadership team I understand the (additional financial) responsibility when signing contracts and deals (MSA’s, SO’s and PO’s) on behalf of the organization.\n• I only do deals that I really understand;\n• I only do deals that make sense (not only financially but in line with all SBP values and mission. As an easy first check: does this deal make our customers and team happier);\n• If we don’t see the “win/win” we should not do the deal, even if there is a short-term gain for SBP;\n• I will always seek consent with my team(s);\n• I will go the extra mile in making sure we-do-the-best-deal-possible (100% also means that we “fight” for a good deal. And we “fight smart” and put all our charm to it);\n• I will always think if I would “spend the money” if it was just for myself”.',
        source: '',
      }),
      text(
        'The “I only do deals that I really understand” is an important one: you actually have to read (and fully understand!) the whole contract and the fine print, before you sign anything.',
      ),
      header('Informal leadership', 1, true),
      text(
        'Although every SBP team can be (and probably will be) different, there are some important organizational characteristics derived from our Culture that are shared among all of them. These common characteristics can be summarized by the principle that all teams are self-steering, driven by experts in the lead, organizing their own work to be able to deliver on their own promise, both to the customer and to SBP. You can read more about our Culture in the [[Culture guide]]. Here we want to highlight how teams use informal leadership to self-organize.',
        'Our self-steering team principle does not imply that everyone is self-steering as an individual (i.e. independent from the team), nor that a team can self-steer itself away from SBP as a whole, nor that Schuberg Philis is a self-directing organisation. Individuals have the responsibility to cooperate in the team to reach their shared team goals, and the teams have the responsibility to cooperate within SBP to contribute to the company’s common goals. It is all about full responsibility and ownership. And about asking for help! You’re not just executing tasks: you are responsible for an outcome, for a result that matters.',
        'We love and need colleagues that take initiative, that have the intent to be “the master of their own destiny.” Those initiatives could be small or large, dealing with technical topics or not at all, involving someone’s own team or not, being relevant for SBP as a whole or for specific colleagues, etc. We cherish a culture where colleagues feel the freedom and the responsibility to take initiative, to “fail fast and fail often” in order to learn quickly, to make our customers happier and to make SBP an even nicer place to work. We like our colleagues to be proactive and not hesitant in their attempts to take initiative. We trust each other to have sufficiently thought through initiatives and to use SBP’s resources wisely in their execution.',
        'The self-organizing characteristic of teams applies in many more instances, for example:\n• Recruiting: The team makes an active effort to recruit new team members together with the Recruitment Team\n• Onboarding: The team takes care of (and is responsible for) the proper onboarding of new team members, in addition to the overall SBP onboarding\n• Giving and asking feedback: The team provides and asks for feedback to/from each other, with the aim to help people develop professionally and personally\n• Learning & development: The team gives advised consent for possibilities to learn outside the team, e.g. by taking courses or attending events, conferences and seminars, together with the People team or Technology Circle\n• Technological decisions: Although SBP has a lot of “building blocks” and “best practices,” teams have the freedom and mandate to decide which technology fits best to meet the promise to the customer – as long as the decision is made with team consent and makes sense in the bigger SBP picture\n• Team investments: Teams can decide to (temporarily) invest money and onboard an extra colleague or purchase certain tooling or otherwise if it makes sense to do so in the long term\n• Team dynamics: The team reflects on its own functioning as a team. The team members speak up, challenge each other, give each other honest feedback and help each other in good and bad times\n• Holidays: The team decides and plans to have timely and sufficient, say 25 days for team members, while keeping the customer happy\n• Moving in, moving out – internal mobility: The team discusses inward and outward movements in the team openly, with respect for individual preferences and the interests of the team and the customers involved need to agree',
        'Cooperation within SBP teams builds on a combination of individual expertise, common ownership and accountability for the end result, the obligation to bring important matters forward, and a team’s advised consent in decision-making. Teams should have a common understanding about what kind of decisions they want to leave with the individual team member and their expertise, and which kind of decisions are expected to be taken collectively based on the principle of advised consent.',
      ),
      header('Referenced documents', 1, false),
      row(linkCard('Culture guide', 'Culture and DNA document')),
    ]),
    seedSection('sbp-odg-s5', 'Document changes', false, [
      text(
        'This chapter describes the major changes to our organization reflected in this document.',
      ),
      text(
        'Version 1.0, February 2021 — Initial version.\nVersion 1.1, March 2021 — Updated to reflect the introduction of a fourth GCT (GCT Rotterdam).\nVersion 1.2, March 2022 — Updated to reflect changes in MD leadership for GCT’s\nVersion 1.3, September 2023 — Update to introduce The Council, update Strategy and Circles\nVersion 1.37, May 2024 — Full rewrite of the document with a changed, easier readable, structure. Alignment with Culture & DNA Document. New OD visuals added. New tables added.\nVersion 1.4, September 2024 — Update on persons in roles, customers\nVersion 1.5, January 2025 — Update on persons in roles, customers, Leadership and Governance, New EOP and Participation (Sociocratic Circle Netherlands), Horizon & Bridgepoint',
      ),
    ]),
  ],
};
