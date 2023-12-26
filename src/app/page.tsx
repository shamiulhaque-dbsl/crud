import Image from 'next/image'
import AddCustomer from '../component/customer/AddCustomer';
import ViewCustomer from '../component/customer/ViewCustomer'

export default function Home() {
  return (
    <div>
       <AddCustomer> </AddCustomer>
       <ViewCustomer> </ViewCustomer>
    </div>
  )
}
