import React, { Suspense } from 'react';
const AddLayoutModal = React.lazy(() => import('./add-layout-modal'));
export default function AddLayout() {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className="grow text-right">
      <button className="btnprimary" onClick={() => setOpenModal(true)}>
        <svg
          className="w-4 h-4 fill-current opacity-50 shrink-0"
          viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Add Layout</span>
      </button>
      {openModal && (
        <Suspense fallback={<></>}>
          <AddLayoutModal openModal={openModal} setOpenModal={setOpenModal} />
        </Suspense>
      )}
    </div>
  );
}
