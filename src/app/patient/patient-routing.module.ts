import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackComponent } from '../create-feedback/create-feedback.component';
import { NewsComponent } from '../news/news.component';
import { RegistrationInfoComponent } from '../modules/profile/registration-info/registration-info.component';
import { AppointmentTableComponent } from '../appointment-table/appointment-table.component';

import { SimpleAppointmentSchedulingComponent } from './simple-appointment-scheduling/simple-appointment-scheduling.component';
import { ScheduleAppointmentComponent } from './appointment-with-suggestions-scheduling/schedule-appointment/schedule-appointment.component';

const routes: Routes = [
  { path: 'createFeedback', component: CreateFeedbackComponent },
  { path: 'view-appointments', component: AppointmentTableComponent },
  { path: 'info', component: RegistrationInfoComponent },
  { path: 'news', component: NewsComponent },
  {
    path: 'schedule-simple-appointment',
    component: SimpleAppointmentSchedulingComponent,
  },
  {
    path: 'schedule-appointment-with-suggestions',
    component: ScheduleAppointmentComponent,
  },
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: '**', redirectTo: 'info', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class PatientRoutingModule {}
export const routingComponents = [CreateFeedbackComponent, NewsComponent];
