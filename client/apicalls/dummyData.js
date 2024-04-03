const approvals = {
  katha: ['A', 'B', 'E'],
  dc_conversion: true,
  planning_permission: ['BDA', 'BMRDA', 'BIAPPA'],
  zone: ['Green Zone', 'Yellow Zone', 'Industrial Zone', 'Commercial Zone'],
  BESCOM: true,
  BWSSB: true,
  BBMP: true,
  site_plan: true,
  tax_receipt: true,
  possession_letter: true,
//   occupancy_certificate: true,
  sale_deed: true,
  mother_deed: true,
//   construction_agreement: true,
  joint_development_agreement: true,
  land_conversion_order: true,
  encumbrance_certificate: true,
//   commencement_certificate: true,
  approved_layout_plan: true,
  property_tax_receipt: true,
  electricity_bill: true,
  water_bill: true,
//   maintenance_bill: true,
  property_photos: true,
  RERA_approved: true,
};


const approvalType = {
    id: '1234',
    type: 'a_katha',
    name: 'A Katha',
    value: false
    description: 'Katha is a legal'
}
const a = [
    {
        id: '1',
        type: 'caveri_water_connection',
        value: false,
    }
]

const transcationData = [
  {
    type: 'Token',
    site_number: '12',
    token_by: 'Ravi',
    token_date: '12-12-2020',
  },
  {
    type: 'Sold',
    site_number: '13',
    sold_to: 'Ravi',
    sold_date: '12-12-2020',
  },
  {
    type: 'Blocked',
    site_number: '14',
    blocked_to: 'Ravi',
    blocked_date: '12-12-2020',
  },
  {
    type: 'Available',
    site_number: '15',
    status_change_date: '12-12-2020',
  },
  {
    type: 'Token Cancelled',
    site_number: '16',
    token_cancelled_by: 'Ravi',
    token_cancelled_date: '12-12-2020',
  }
]