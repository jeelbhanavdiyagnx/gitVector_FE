import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter, DialogHeader,DialogTitle,DialogTrigger} from '@/components/ui/dialog';
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from '@/components/ui/tooltip';
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import {fetchReposRequest,fetchUserRepoRequest} from '@/redux/actions/gitRepoAction';
import { fetchOrgRequest } from '@/redux/actions/gitOrgAction';
import {IoAdd,IoClose,IoInformationCircleOutline} from 'react-icons/io5';
import { Portal } from '@radix-ui/react-portal';
import { userAccessLevelData } from '@/constants/data';
import { MinusCircleIcon } from 'lucide-react';
import {fetchUsersRequest,getInviteUsersRequest,removeUserRequest,sendInviteRequest,updateUserRequest} from '@/redux/actions/userAction';
import {Command,CommandEmpty,CommandItem,CommandList} from '@/components/ui/command';
import { formatCamelCase } from '../utils/helper';
import ManagementHeader from '../Management Components/managementHeader';
import RemoveDialog from '../Management Components/RemoveDialog';
import { Checkbox } from '@/components/ui/checkbox';

function UserManagement() {
  const dispatch = useDispatch();
  const { data, inviteUsers, loading, removeUsers } = useSelector((state) => state.gitUser);
  const userRepos = useSelector((state) => state.gitRepo.userRepos);
  const { orgsData } =useSelector((state) => state.gitOrg);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState([]);
  const [removeInputValue, setRemoveInputValue] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(false);
  const [inviteModal, setInviteModal] = useState({isOpen: false, index: "", user: ""});
  const [searchData, setSearchData] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [accessLevel, setAccessLevel] = useState('Developer');
  const [errorMessage, setErrorMessage] = useState(false);
  const [sendInviteMessage, setSendInviteMessage] = useState({ message: '' });
  const [addMoreDisable, setAddMoreDisable] = useState(true);
  const [inputs, setInputs] = useState([{ gitUser: null, email: '', userRole: '', organizations: []}]);
  const triggerRef = React.useRef(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);
  const updateTriggerWidth = () => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  };
  useEffect(() => {
    updateTriggerWidth();
    const handleResize = () => updateTriggerWidth();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [triggerRef.current]);
  useEffect(() => {
    dispatch(fetchOrgRequest());
    dispatch(fetchReposRequest());
    dispatch(getInviteUsersRequest());
  }, []);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);
  const handleInputChange = (index, field, value) => {    
    if (field === "userRole" ) {
      setInviteModal((prev) => ({...prev, index: index}))
    }
    const updatedInputs = [...inputs];
    if (field === "organizations") {
      const currentOrganizations = updatedInputs[index][field] || [];
      
      if (inputs?.some(i => i?.organizations?.includes(value))) {
        updatedInputs[index][field] = currentOrganizations.filter(org => org !== value);
      } else {
        updatedInputs[index][field] = [...currentOrganizations, value];
      }
    } else {
      updatedInputs[index][field] = value;
  }
    setInputs(updatedInputs);
    const newData = inviteUsers?.data
      ? inviteUsers?.data.filter((item) =>
        item.login.toLowerCase().includes(value.toLowerCase())
      )
      : [];
    const filteredData = newData.filter(
      (newItem) => !inputs.some((input) => input.gitUser === newItem.id)
    );
    setSearchData(filteredData);
    setSendInviteMessage('');
    const updatedDropdownVisibility = Array.isArray(showAddDropdown)
      ? [...showAddDropdown]
      : [];
    if (value.trim().length > 0) {
      updatedDropdownVisibility[index] = true;
    } else {
      updatedDropdownVisibility[index] = false;
    }
    setShowAddDropdown(updatedDropdownVisibility);
  };
  const handleSelectUser = (index, user, userId) => {
    if (userId) {
      const updatedInputs = [...inputs];
      updatedInputs[index]['email'] = '';
      updatedInputs[index]['gitUser'] = userId;
      setInputs(updatedInputs);
    }

    setSelectedValue((prev) => {
      const updatedSelectedValue = [...prev];

      updatedSelectedValue[index] = user;
      return updatedSelectedValue;
    });

    setShowAddDropdown(false);
  };
  const handleAccessLevelChange = (newAccessLevel) => {
    setAccessLevel(newAccessLevel);
  };
  const handleSendInvite = () => {
    const hasMoreManager = inputs?.filter((item) => item?.userRole === "manager")
    if (hasMoreManager.length > 1) {
      const filterData = inputs?.filter((item) => item?.organizations.length === 0)
      setInputs(filterData)
      const sentData = inputs?.filter((item ) => item?.organizations.length > 0)
      dispatch(sendInviteRequest(sentData))
    }
    else{
      dispatch(sendInviteRequest(inputs));
      setInputs([{ gitUser: null, email: '', userRole: '', organizations: [] }]);
      setSelectedValue([]);
      setSendInviteMessage('');
      setShowAddModal(false);
      dispatch(fetchUsersRequest());
    }
  };
  
  useEffect(() => {
    if (inputs.filter((i) => i?.userRole).length !== inputs?.length) {
      setAddMoreDisable(true);
    } else {
      setAddMoreDisable(false);
    }
  }, [inputs]);

  const handleAddMore = () => {
    setInputs((prevInputs) => [...prevInputs, { email: '', userRole: '' }]);
    setShowAddDropdown((prev) => (Array.isArray(prev) ? false : [false]));
  };
  const handleUpdation = (userId, level) => {
    if (userId && level) {
      dispatch(updateUserRequest(userId, level));
      setCloseEditModal(true);
      dispatch(fetchUsersRequest());
    }
  };
  const handleInputValue = (e) => {
    const value = e.target.value;
    setRemoveInputValue(value);
  };
  const handleClear = (item) => {
    setSelectedValue((prev) => {
      const updatedSelectedValue = [...prev];
      updatedSelectedValue[item] = '';
      return updatedSelectedValue;
    });
    if (inputs[item]?.gitUser) {
      const updatedInputs = [...inputs];
      updatedInputs[item].gitUser = '';
      setInputs(updatedInputs);
    }
  };
  
  const handleRemoveDropdown = (val) => {
    const result = inputs?.filter((item, index) => index !== val);
    const updatedInputs = [...inputs];
    updatedInputs[val]['email'] = '';
    updatedInputs[val]['gitUser'] = null;
    updatedInputs[val]['userRole'] = '';

    setInputs(updatedInputs);

    setInputs(result);
  };
  const handleGoBack = () => {
    setRemoveInputValue('');
    setErrorMessage(false);
  }
  useEffect(() => {
    if (removeUsers.data) {
      dispatch(fetchUsersRequest());
    }
  }, [dispatch, removeUsers])
  const handleRemove = (item) => {
    if (removeInputValue === item?.login) {
      dispatch(removeUserRequest(item?._id));
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  }

  
  const handleSubmit = () => {
    const isInputValid = inputs.every(
      (i) => (i?.email || i?.gitUser) && i?.userRole
    );  
    if (!isInputValid) {
      const errorMessage = inputs.some((i) => !i?.email && !i?.gitUser && !i?.userRole)
        ? 'Enter email and select access level'
        : inputs.some((i) => !i?.email)
        ? 'Enter email'
        : 'Select access level';
      setSendInviteMessage({ message: errorMessage });
      return;
    }
  
    const hasInvalidEmail = inputs.some(
      (i) => i?.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(i?.email)
    );
  
    if (hasInvalidEmail) {
      setSendInviteMessage({ message: 'Invalid email address' });
      return;
    }
    const isManagerRole = inputs?.filter((item) => item.userRole === 'manager');
    if (isManagerRole.length > 0) {      
      setInviteModal((prev) => ({...prev, isOpen: true}))
    }
    else{
      setInviteModal((prev) => ({...prev, isOpen: false}))
      handleSendInvite()
    }
  }
  useEffect(() => {   
    const fetchData = inputs && inviteModal && inputs.find((item, i) => i === inviteModal.index && item?.userRole === "manager");
  
    if (fetchData && fetchData?.userRole === "manager") {
      const newUser = fetchData.email
        ? fetchData.email
        : fetchData.gitUser
        ? inviteUsers?.data?.find((item) => item?.id === fetchData.gitUser)?.login
        : null;
  
      if (newUser && newUser !== inviteModal.user) {
        setInviteModal((prev) => ({ ...prev, user: newUser }));
      }
    }
    else {
      const fetchManagerData = inputs && inputs.find((item) =>  item?.userRole === "manager")
      if (fetchManagerData) {
        const newUser = fetchManagerData.email
        ? fetchManagerData.email
        : fetchManagerData.gitUser
        ? inviteUsers?.data?.find((item) => item?.id === fetchManagerData.gitUser)?.login
        : null;
  
      if (newUser && newUser !== inviteModal.user) {
        setInviteModal((prev) => ({ ...prev, user: newUser }));
      }
      const newInviteIndex = inputs && inputs?.map((item,index) => item?.userRole === "manager" ? index : null)
      setInviteModal((prev) => ({ ...prev, index: newInviteIndex.find((item) => item !== null) }))
      
      }
    }
  }, [inputs, inviteModal.index, inviteUsers?.data]);
    
  return (
    <div className="flex flex-col gap-5 px-5 py-10 dark:text-white lg:w-2/3">
      <div className='w-full'>
        <ManagementHeader title={"User Management"} description={"You can change and update users in your account below"} />
      </div>
      <div className='w-full mt-2 pr-4'>
        <div className='w-full'>
          {loading || removeUsers.loading ? (
            <div className="flex h-[280px] w-full items-center justify-center ">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
          ) : data.length > 0 ? (
            <ScrollArea className="max-h-[280px] overflow-y-auto rounded-md border px-4 py-1 ">
              {data?.map((item) => (
                <div
                  key={item?.id}
                  className="flex items-center justify-between border-b"
                >
                  <h1 className="text-sm font-medium text-[#09090B] md:text-base dark:text-white">
                    {item?.login} |{' '}
                    <span className="text-xs font-medium text-[#71717A] md:text-sm">
                      {formatCamelCase(item?.accesslevel)}
                    </span>
                  </h1>
                  <div className="flex items-center gap-1">
                    <Dialog onOpenChange={() => setCloseEditModal(false)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="px-0 text-sm font-normal text-[#71717A]"
                          onClick={() => {
                            setCloseEditModal(false);
                            dispatch(fetchUserRepoRequest(item?._id));
                          }}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      {!closeEditModal && (
                        <DialogContent
                          closeIcon={true}
                          className=" ` my-0 h-[500px] w-11/12 max-w-[462px] pb-1  pt-4 sm:w-auto md:h-[400px]"
                        >
                          {userRepos?.loading ? (
                            <div className="flex h-full w-full  items-center justify-center ">
                              Loading...
                            </div>
                          ) : (
                            <>
                              <DialogHeader className="space-y-1 text-left">
                                <DialogTitle className="leading-none">
                                  Edit User
                                </DialogTitle>
                                <DialogDescription className="pt-0">
                                  You can view details and change the user
                                  details below
                                </DialogDescription>
                                <div className="pb-3 pt-2 text-sm font-bold text-black dark:font-medium dark:text-white">
                                  <h1>User name: {item?.login}</h1>
                                  <h1>
                                    Repositories:{' '}
                                    {userRepos?.data
                                      ?.map((i) => i.name)
                                      .join(', ')}
                                  </h1>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <h1 className="text-sm font-bold">
                                    Access Level
                                  </h1>
                                  <Select
                                    onValueChange={(value) =>
                                      handleAccessLevelChange(value)
                                    }
                                  >
                                    <SelectTrigger
                                      ref={triggerRef}
                                      className="h-12 w-auto"
                                    >
                                      <SelectValue
                                        placeholder={item?.accesslevel}
                                      />
                                    </SelectTrigger>
                                    <SelectContent
                                      style={{ width: triggerWidth }}
                                    >
                                      <SelectGroup>
                                        <SelectItem
                                          className="flex items-center justify-start text-xs font-normal md:text-sm"
                                          value="Developer"
                                        >
                                          Developer |{' '}
                                          <span className="text-xs text-[#71717A]">
                                            {' '}
                                            Can analyze self made code
                                            contributions
                                          </span>
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs font-normal md:text-sm"
                                          value="Admin"
                                        >
                                          Admin |{' '}
                                          <span className="text-xs text-[#71717A]">
                                            Can manage and analyze users, repos.
                                            org and billing
                                          </span>
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs font-normal md:text-sm"
                                          value="Manager"
                                        >
                                          Manager |{' '}
                                          <span className="text-xs text-[#71717A]">
                                            {' '}
                                            Can manage and analyze users, repos
                                            and org
                                          </span>
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </DialogHeader>

                              <DialogFooter className="mt- flex w-full  flex-row items-center justify-between gap-2 sm:justify-between">
                                <DialogClose className="rounded-md bg-[#71717A] px-4 py-2 text-white">
                                  Go Back
                                </DialogClose>
                                <Button
                                  onClick={() =>
                                    handleUpdation(item?._id, accessLevel)
                                  }
                                  className="mt-2 text-sm"
                                >
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </>
                          )}
                        </DialogContent>
                      )}
                    </Dialog>
                    <span className="text-sm font-normal">|</span>
                    <RemoveDialog dialogFor={"user"} item={item} inputValue={removeInputValue} onInputChange={handleInputValue} errorMessage={errorMessage}
                      onGoBack={handleGoBack} onRemove={handleRemove} />
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className=" flex h-[180px] flex-col items-center justify-center lg:w-[450px]">
              <h1>No User Found.</h1>
              <p className="text-sm text-[#71717A]">Send Invite to add user</p>
            </div>
          )}
          <Button
            variant="default"
            className="mt-5 text-xs lg:text-sm"
            onClick={() => setShowAddModal(true)}
          >
            Add More Users
          </Button>
        </div>
      </div>
      {showAddModal && (
        <div className='w-full'>
          <div className="flex w-full flex-col gap-1">
            <h1 className="text-base font-medium text-[#09090B] dark:text-white">
              Add user email below
            </h1>
            {inputs?.map((list, index) => (
              <div
                className=" mb-1 flex    rounded-md md:flex-row md:gap-0 "
                key={index}
              >
                <div className="mr-1 flex w-full flex-col   lg:flex-row">
                  <Command>
                    {selectedValue[index] ? (
                      <div className="flex h-9 w-full items-center justify-between border  px-2 shadow-none focus:outline-none">
                        {selectedValue[index]}
                        <span onClick={() => handleClear(index)}>
                          <IoClose />
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        onChange={(e) =>
                          handleInputChange(index, 'email', e.target.value)
                        }
                        className="h-9 w-full border px-2 shadow-none  focus:outline-none"
                        placeholder="example@user.com"
                        value={list.email}
                      />
                    )}
                    {showAddDropdown[index] && (
                      <CommandList className="border">
                        {searchData ? (
                          searchData.map((item) => (
                            <CommandItem
                              key={index || item.id}
                              onClickCapture={() =>
                                handleSelectUser(index, item?.login, item?.id)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ')
                                  handleSelectUser(
                                    index,
                                    item?.login,
                                    item?.id
                                  );
                              }}
                              tabIndex="0"
                              className="flex cursor-pointer items-center gap-2 rounded border-b px-2 py-2 hover:bg-gray-100"
                            >
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base">
                                {item?.login}
                              </label>
                            </CommandItem>
                          ))
                        ) : (
                          <CommandEmpty>No results found.</CommandEmpty>
                        )}
                      </CommandList>
                    )}
                  </Command>

                  <Select
                    value={list.userRole}
                    onValueChange={(value) =>
                      handleInputChange(
                        index,
                        'userRole',
                        value.toLowerCase()
                      )
                    }
                  >
                    <SelectTrigger className="w-full rounded-none border-l-2 px-1 shadow lg:w-[220px] lg:border-none">
                      <span className="text-sm font-normal">
                        {list?.userRole.charAt(0).toUpperCase() +
                          list?.userRole.slice(1) || 'Select Access Level'}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {userAccessLevelData?.map(
                        (accesLevelItem, accesLevelItemIndex) => (
                          <SelectItem
                            value={accesLevelItem?.level}
                            key={accesLevelItemIndex}
                            checkIcon={false}
                            className="relative w-full"
                          >
                            <div className="flex items-center justify-between">
                              <h1>{accesLevelItem?.level}</h1>
                              <span className="absolute right-0">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        className={`h-auto justify-start px-0 py-1 text-left font-medium`}
                                        variant="link"
                                      >
                                        <IoInformationCircleOutline
                                          className=""
                                          fontSize={16}
                                        />
                                      </Button>
                                    </TooltipTrigger>
                                    <Portal>
                                      <TooltipContent
                                        side="bottom"
                                        className="min-w-auto  max-w-auto z-[9999] bg-white px-2  text-xs font-normal leading-5 text-[#71717A] shadow-md"
                                      >
                                        {accesLevelItem?.info}
                                      </TooltipContent>
                                    </Portal>
                                  </Tooltip>
                                </TooltipProvider>
                              </span>
                            </div>
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex h-9 w-9 items-center justify-center">
                  {index > 0 && (
                    <MinusCircleIcon
                      onClickCapture={() => {
                        handleRemoveDropdown(index);
                        handleClear(index);
                      }}
                      color="#ff0000"
                      className=""
                    />
                  )}
                </div>
              </div>
            ))}

            <button
              disabled={addMoreDisable}
              className={`flex cursor-pointer items-center ${addMoreDisable && 'text-gray-400'
                } text-[#71717A]`}
              onClick={handleAddMore}
            >
              <IoAdd />

              <span>Add more</span>
            </button>
          </div>
          <div className="flex flex-col items-start gap-1">
          {sendInviteMessage.message && (
              <p className="text-sm text-[#FF0000]">
                {sendInviteMessage.message}
              </p>
            )}
            <Dialog >
              <DialogTrigger asChild>
                <Button className="text-sm" onClick={handleSubmit}>
                  Send Invite
                </Button>
              </DialogTrigger>
              {inviteModal.isOpen && (
                <DialogContent
                  closeIcon={true}
                  className=" ` my-0 h-[500px] w-11/12 max-w-[462px] pb-1  pt-4 sm:w-auto md:h-[400px]"
                >
                  {orgsData?.loading ? (
                    <div className="flex h-full w-full  items-center justify-center ">
                      Loading...
                    </div>
                  ) : (
                    <>
                      <DialogHeader className="space-y-1 text-left">
                        <DialogTitle className="leading-none">
                          Select organizations {inviteModal?.user}{' '}
                          will have access to ?
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-2">
                          <div className="h-[209px] w-full border border-[#EAEAEA] p-2 mt-2">
                            {orgsData?.loading ? <div className="flex h-[250px] w-full items-center justify-center lg:w-2/3">
                              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
                            </div> :
                              <div className="gap-2 py-1">
                                {orgsData?.data?.map((item, orgsIndex) => (
                                  <div key={orgsIndex} className="flex items-center gap-2 py-1">
                                    <Checkbox
                                      id={item._id}
                                      checked={ inputs?.some((i) => i.organizations?.includes(item?._id))
                                      }
                                      onCheckedChange={() => handleInputChange(inviteModal.index, "organizations", item._id)}
                                    />
                                    <label
                                      htmlFor={item.login}
                                      className="text-sm font-medium leading-none text-black sm:text-base"
                                    >
                                      {item.login}
                                    </label>
                                  </div>
                                ))
                                }
                              </div>}
                          </div>
                          <p className="flex gap-1 text-left text-xs font-medium md:items-center">
                            <span>
                              {' '}
                              <IoInformationCircleOutline className="text-base md:text-sm" />
                            </span>
                            Please note it might take few minutes to receive the invite.
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt- flex w-full  flex-row items-center justify-between gap-2 sm:justify-between">
                        <DialogClose className="rounded-md bg-[#71717A] px-4 py-2 text-white" >
                          Go Back
                        </DialogClose>
                        <Button
                          onClick={handleSendInvite}
                          className="mt-2 text-sm"
                        >
                          Send invite
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserManagement;
