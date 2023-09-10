import { RoutePath } from "src/app/app-routing.module";

export const Config = {
  defaultNavLinks: [{
    label: 'EUR USD Details',
    url: RoutePath.DetailsPage
  }, {
    label: 'USD GBP Details',
    url: RoutePath.DetailsPage
  }]
}