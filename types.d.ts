// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Company = {
    id:            string    
    name:          string
    federalTaxId:  string | null
    address1:      string | null
    address2:      string | null
    city:          string | null
    state:         string | null
    zip:           string | null
    phone:         string | null
    mobile:        string | null
    fax:           string | null
    email:         string | null
    createdAt?:    Date
  }
  
  // This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.
  export type Customer = {
      id:            string
      companyId?:     string
      name:          string
      displayName?:   string | null        
      contact?:       string | null
      manager?:       string | null
      externalId?:    string | null 
      federalTaxId?:  string | null
      address1?:      string | null
      address2?:      string | null
      city?:          string | null
      state?:         string | null
      zip?:           string | null
      phone?:         string | null
      mobile?:        string | null
      fax?:           string | null
      email?:         string | null
      createdAt?:    Date
  }
  
  // This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.
  export type Project = {
      id:                 string
      customerId:         string
      customer?:          Customer | null
      name:               string
      manager:            string
      phone:              string | null
      email:              string | null
      statementsOfWork?:  StatementOfWork[] | null
      createdAt?:         Date
  }
  
  // This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.
  export type Resource = {
      id:             string
      companyId?:     string
      name:           string
      federalTaxId?:  string | null
      address1?:      string | null
      address2?:      string | null
      city?:          string | null
      state?:         string | null
      zip?:           string | null
      phone?:         string | null
      mobile?:        string | null
      fax?:           string | null
      email:          string | null
      createdAt?:     Date
  }
  
  // This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.
  export type StatementOfWork = {
      id:             string
      projectId?:     string
      project?:       Project
      name:           string
      fileLocation?:  string | null
      startDate?:     Date | null
      endDate?:       Date | null
      value?:         float | null
      active?:        boolean 
      sowResources?:  SOWResource[] | null
      createdAt?:     Date
  }
  
  export type ProjectRole = {
      id:         string
      role:       string
      createdAt?: Date
    }
    
    export type  SOWResource = {
      id:             string    
      sowId?:         string
      statementOfWork?: StatementOfWork
      resourceId?:    string
      resource?:      Resource
      projectRoleId?: string
      projectRole?:   ProjectRole
      active:         boolean
      billingRate?:   float
      createdAt?:     Date
    }
    
    export type Service = {
      id:          string
      name:        string
      active:      boolean
      createdAt?:  Date
    }

    export type Timesheet = {
      id:             string
      email:          string
      date:           Date
      sowId:          string
      statementOfWork?: StatementOfWork      
      resourceId:     string
      resource?:      Resource
      serviceId:      string
      service?:       Service
      hours:          float
      description:    string
      billable:       boolean
      status:         string
      approvedBy?:    string | null
      approvedDate?:  Date  | null
      createdAt?:     Date
  }   
    
  export type FormType = "Add" | "Edit";