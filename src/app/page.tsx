import Image from 'next/image'
import AddCustomer from '../component/customer/AddCustomer';
import ViewCustomer from '../component/customer/ViewCustomer'

export default function Home() {
  return (
    <div className='grid grid-cols-9'>
      <div className='col-span-3 ml-8'>
      <AddCustomer> </AddCustomer>
      </div>
      <div className='col-span-6 mt-24 ml-5 pb-40'>
      <ViewCustomer > </ViewCustomer>
      </div>
    </div>
  )
}
