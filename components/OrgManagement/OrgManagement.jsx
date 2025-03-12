import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { GoArrowUpRight } from 'react-icons/go';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADDNEWORGLIST_REQUEST,
  FETCH_ORG_REQUEST,
  removeOrgRequest,
  updateOrgRequest
} from '@/redux/actions/gitOrgAction';
import { Checkbox } from '../ui/checkbox';
import { RxRocket } from 'react-icons/rx';
import ManagementHeader from '../Management Components/managementHeader';
import RemoveDialog from '../Management Components/RemoveDialog';

function OrgManagement() {
  const dispatch = useDispatch();
  const { orgsData, loading, updateOrgState, removedOrgState, addNewOrgList } =
    useSelector((state) => state.gitOrg);
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitValid, setIsSubmitValid] = useState(true);
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {
    dispatch({ type: FETCH_ORG_REQUEST });
    dispatch({ type: ADDNEWORGLIST_REQUEST });
  }, [dispatch]);
  const handleInputValue = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  useEffect(() => {
    if (updateOrgState?.loading || removedOrgState?.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [updateOrgState, removedOrgState]);
  useEffect(() => {
    if (removedOrgState.data || updateOrgState) {
      dispatch({ type: FETCH_ORG_REQUEST });
      dispatch({ type: ADDNEWORGLIST_REQUEST });
    }
  }, [removedOrgState, updateOrgState]);

  const handleChecked = (item) => {
    setSelectedOrg((prev) => {
      if (prev.includes(item)) {
        return prev.filter((org) => org !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  useEffect(() => {
    const availableLicenses = 5;

    if (selectedOrg.length > 0) {
      const totalOrgs = (orgsData?.data?.length || 0) + selectedOrg.length;

      if (totalOrgs >= availableLicenses) {
        setDisableCheckbox(true);
      } else {
        setDisableCheckbox(false);
      }
    } else {
      setDisableCheckbox(false);
    }
  }, [selectedOrg, orgsData]);
  useEffect(() => {
    if (updateOrgState.data) {
      dispatch({ type: FETCH_ORG_REQUEST });
      dispatch({ type: ADDNEWORGLIST_REQUEST });
      setSubmitLoading(false);
    }
  }, [dispatch, updateOrgState]);
  const handleSubmit = async () => {
    if (selectedOrg.length > 0) {
      await Promise.all(
        selectedOrg?.map((org) => dispatch(updateOrgRequest(org)))
      );
      setSubmitLoading(true);
      setShowAddModal(false);
    } else {
      setIsSubmitValid(false);
    }
    setSelectedOrg([]);
  };
  const handleGoBack = () => {
    setInputValue('');
    setErrorMessage(false);
  }
  const handleRemove = async(item) => {
    try {

      if (inputValue === item?.login) {
        await Promise.all([
          dispatch(removeOrgRequest(item?._id))
        ]);
        setErrorMessage(false);
        setInputValue('');
        setShowAddModal(false);
      } else {
        setErrorMessage(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col gap-5 px-5 py-10 dark:text-white">
      <div className="lg:w-2/3">
        <ManagementHeader
          title="Organization management"
          description=" You can change and update organizations in your account below. To
          understand how this affects your existing data read more on this
          article here"
        />
      </div>
      <div className="flex flex-col gap-3">
        {orgsData?.loading || submitLoading ? (
          <div className="flex h-[250px] w-full items-center justify-center lg:w-2/3">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4 lg:w-2/3">
            <div className="flex flex-col gap-1 text-base font-medium text-[#09090B] dark:text-white">
              <h1>Available organization license: 5</h1>
              <h1>Utilized organization license: {orgsData?.data?.length}</h1>
            </div>
            <div>
              <ScrollArea className="max-h-[180px] w-full overflow-auto rounded-md border px-4 py-1 ">
                {orgsData?.data?.length > 0 ? (
                  orgsData?.data?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b"
                    >
                      <h1 className="text-base font-medium text-[#09090B] dark:text-white">
                        {item.login}
                      </h1>
                      <div className="flex items-center gap-1">
                        <RemoveDialog dialogFor={"org"} item={item} inputValue={inputValue} onInputChange={handleInputValue} errorMessage={errorMessage}
                        onGoBack={handleGoBack} onRemove={handleRemove}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-[100px] w-full items-center justify-center">
                    No organization Found
                  </div>
                )}
              </ScrollArea>
              <Button
                variant="default"
                className="mt-5"
                onClick={() => setShowAddModal(true)}
              >
                Add More
              </Button>
            </div>
          </div>
        )}
      </div>
      {showAddModal &&
        (orgsData?.data?.length >= 5 ? (
          <div>
            <div className="flex w-3/5 flex-col gap-1">
              <div className="inline-block text-base font-normal text-[#FF0000]">
                <h1 className="inline">
                  You cannot add more organizations since you have already
                  assigned available licenses. You can upgrade your plan here{' '}
                </h1>
                <GoArrowUpRight className="inline text-lg" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex w-full flex-col gap-1 sm:w-3/5">
              <h1 className="text-base font-medium text-[#09090B] dark:text-white">
                Select organization you want to add
              </h1>
              <ScrollArea className="max-h-[180px] w-full overflow-auto rounded-md border py-1 sm:w-[450px] sm:px-4">
                {loading ? (
                  <div className="flex h-[100px] w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
                  </div>
                ) : addNewOrgList?.data?.length > 0 ? (
                  addNewOrgList?.data?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 border-b py-1"
                    >
                      <Checkbox
                        value={item.id}
                        disabled={
                          selectedOrg?.some((i) => i?.id === item?.id)
                            ? false
                            : disableCheckbox
                        }
                        type="checkbox"
                        id={item.id}
                        onCheckedChange={() => handleChecked(item)}
                      />
                      <label
                        htmlFor={index}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base"
                      >
                        {item.login}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="flex h-[100px] w-full items-center justify-center">
                    No new organization found
                  </div>
                )}
              </ScrollArea>
            </div>
            <div className="mt-8">
              {!isSubmitValid && (
                <p className="text-sm text-[#ff0000]">
                  No organization selected. Please choose an organization to
                  continue.
                </p>
              )}
              <Button onClick={() => handleSubmit()} className="mt-1 text-sm">
                Confirm
              </Button>
            </div>
            <Dialog open={isLoading}>
              <DialogContent
                closeIcon={false}
                className="h-16 w-11/12 max-w-[320px] px-2 py-2 sm:w-[320px]"
              >
                <DialogHeader>
                  <DialogTitle className="flex items-start gap-1 text-lg font-medium text-[#09090B] dark:text-white">
                    <RxRocket className="mt-1 text-2xl" />
                    Fetching repositories, this might take some time...
                  </DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))}
    </div>
  );
}
export default OrgManagement;
