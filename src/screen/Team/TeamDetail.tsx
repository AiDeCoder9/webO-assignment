import { Button } from '@/components/inputs';
import { routePaths } from '@/routes/routes';
import { sanitizeURL } from '@/utils/sanitize-url';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'reactstrap';

export default function TeamDetail(props: ITeamRequestData) {
  const { name, billableHours, members, id } = props;
  const navigate = useNavigate();
  return (
    <div className="detail mt-4">
      <h6 className="title">{name}</h6>
      <span className="text-dark small d-block mb-3">{id}</span>
      <Badge title="Team" className="d-inline-block h5" color="primary" pill>
        Team
      </Badge>
      <div className="row">
        <div className="col-6">
          <div className="textbox">
            <p>Billable Hours</p>
            <span>{billableHours}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="textbox">
            <p>Members</p>
            <ul className="list-01">
              {members.map((member) => (
                <li key={member.value}>{member.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Button
        onClick={() => id && navigate(sanitizeURL(routePaths.teamUpdate, { id }))}
        className="btn-icon w-100 justify-content-center mt-4"
        size="lg">
        <AiFillEdit className="mr-2" /> Edit Team
      </Button>
    </div>
  );
}
