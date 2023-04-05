import React, { useState } from 'react';
import { useTeamList } from './teamQueries';
import Table from '@/components/display/Table/PaginatedTable';
import { useTeamColumn } from './team.schema';
import { Button } from '@/components/inputs';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/routes/routes';
import Overlay from '@/components/display/Overlay/Overlay';
import TeamDetail from './TeamDetail';
export default function TeamList() {
  const [isOverlayOpen, setOverlay] = useState<boolean>(false);
  const [teamDetail, setTeamDetail] = useState<ITeamRequestData | null>(null);
  const toggle = (data?: ITeamRequestData) => {
    console.log(data, 'data');
    setOverlay(!isOverlayOpen);
    if (data) setTeamDetail(data);
  };

  const navigate = useNavigate();
  const { data: teamList, isLoading: loading } = useTeamList();
  const columns = useTeamColumn({ view: toggle });

  return (
    <>
      <Table
        data={teamList || []}
        bordered
        columns={columns}
        isLoading={loading}
        action={
          <Button className="btn-icon" onClick={() => navigate(routePaths.team)}>
            <IoMdAdd color="#fff" /> Add Team
          </Button>
        }
      />
      <Overlay toggle={toggle} isOpen={isOverlayOpen} title="Team Information">
        {teamDetail && <TeamDetail {...teamDetail} />}
      </Overlay>
    </>
  );
}
