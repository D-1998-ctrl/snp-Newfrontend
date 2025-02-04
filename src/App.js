import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarComponent from './Sidebar/Sidebar';
import Insights from './Pages/Insights';
import Account from './Pages/Account';
import Contact from './Pages/Contact';
import ErrorPage from './Pages/ErrorPage';
import Tasks from './Templates/Task/Tasks';
import TasksUpdate from './Templates/Task/TasksUpdate.js';
import Tags from './Templates/Tags/Tags';
import EmailTemp from './Templates/EmailTemp/EmailTemp';
import EmailTempUpdate from './Templates/EmailTemp/EmailTempUpdate.js';
import Templates from './Pages/Templates';
import JobTemp from './Templates/JobsTemp/JobTemp';
import JobTemplateUpdate from './Templates/JobsTemp/JobTemplateUpdate'
import PipelineTemp from './Templates/PipelineTemp/PipelineTemp';
import PipelineTempUpdate from './Templates/PipelineTemp/PipelineTempUpdate.js';
import FolderTemp from './Templates/FoldersTemp/FolderTemp';
import ChatTemp from './Templates/ChatsTemp/ChatTemp';
import SMSTemp from './Templates/SMSTemp/SmsTemp';
import InvoiceTemp from './Templates/InvoicesTemp/InvoiceTemp';
import OrganizerTemp from './Templates/OrganizersTemp/OrganizerTemp';
import RecurringInvoiceTemp from './Templates/RecurringInvoiceTemp/RecurringInvoiceTemp';
import SignatureTemp from './Templates/SignatureTemp/SignatureTemp';
import ProposalTemp from './Templates/ProposalsTemp/ProposalTemp';
import CreateJob from './Jobs/CreateJob';
import Docs from './Pages/Docs'

import Invoices from './Billing/Invoices';
import Services from './Pages/Service';
import MyAccount from './Settings/MyAccount'
import Pipeline from './Workflow/Pipeline';
import WorkflowTask from './Workflow/Tasks'
import TeamMember from './Users/TeamMember.js';
import Jobs from './Pages/Jobs.js';
import ChatTempUpdate from './Templates/ChatsTemp/ChatTempUpdate.js';
import InvoiceTempUpdate from './Templates/InvoicesTemp/InvoiceTempUpdate.js';
const App = () => {
  return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<SidebarComponent />}>
          <Route index element={<Insights />} />
          <Route path='/docs' element={<Docs/>}/>
          <Route path='clients/accounts' element={<Account />} />
          <Route path='clients/contacts' element={<Contact />} />
         
          <Route path='addJobs' element={<CreateJob />} />
          <Route path='billing/Invoices' element={<Invoices/>}/>
          <Route path='workflow/tasks' element={<WorkflowTask/>}/>
          <Route path='workflow/jobs' element={<Jobs/>}/>
          <Route path='workflow/pipelines' element={<Pipeline/>}/>
          <Route path='firmtemp/templates' element={<Templates />}>
            <Route path="tasks" element={<Tasks />} />
            <Route path='tasks/taskTempUpdate/:_id' element={<TasksUpdate/>} />
            <Route path='tags' element={<Tags />} />
            <Route path='emails' element={<EmailTemp />} />
            <Route path='emails/emailTemplateUpdate/:_id' element={<EmailTempUpdate/>}/>
            <Route path='jobs' element={<JobTemp />} />
            <Route path="jobs/JobTemplateUpdate/:_id" element={<JobTemplateUpdate />} />
            <Route path='pipelines' element={<PipelineTemp />} />
            <Route path='pipelines/PipelineTempUpdate/:_id' element={<PipelineTempUpdate/>}/>
            <Route path='folders' element={<FolderTemp />} />
            <Route path='chats' element={<ChatTemp />} />
            <Route path='chats/chatTemplateUpdate/:_id' element={<ChatTempUpdate/>}/>
            <Route path='sms' element={<SMSTemp />} />
            <Route path='invoices' element={<InvoiceTemp />} />
            <Route path='invoices/invoiceTempUpdate/:_id' element={<InvoiceTempUpdate/>}/>
            <Route path='organizers' element={<OrganizerTemp />} />
            <Route path='recurring-invoices' element={<RecurringInvoiceTemp />} />
            <Route path='signatures' element={<SignatureTemp />} />
            <Route path='proposals' element={<ProposalTemp />} />
          </Route>
          <Route path='/firmtemp/teammember' element={<TeamMember/>}/>
          <Route path='/firmtemp/services' element={<Services/>}/>
          <Route path='/settings/myaccount' element={<MyAccount/>}/>

          <Route path='*' element={<ErrorPage />} />
        </Route>
      
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;


