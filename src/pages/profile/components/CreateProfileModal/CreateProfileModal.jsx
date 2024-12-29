import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import { Col, Flex, Form, Row } from "antd";
import Avatar from "../../../../components/Avatar/Avatar";
import Input from "../../../../components/Input/Input";
import Label from "../../../../components/Label/Label";
import { debounce } from "lodash";
import Select from "../../../../components/Select/Select";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const CreateProfileModal = forwardRef(({ onConfirm, open }, ref) => {
  const [isOpen, setIsOpen] = useState(open ?? false);
  const [avatarSrc, setAvatarSrc] = useState();
  const [form] = Form.useForm();

  const handleConfirm = () => {
    const vals = form.getFieldsValue();
    if (vals.birthdate) {
      const day = Number(vals.day ?? "0");
      const month = Number(vals.month ?? "0");
      const year = Number(vals.year ?? "0");
      vals.date_of_birth = +new Date(year, month, day);
      delete vals.birthdate;
      delete vals.day;
      delete vals.month;
      delete vals.year;
    }

    onConfirm && onConfirm(vals);
  };

  const handleSetAvatarSrc = debounce((newSrc) => {
    setAvatarSrc(newSrc);
  }, 800);

  const handleFormValuesChange = (vals) => {
    if (vals.avatar) {
      if (vals.avatar !== avatarSrc) {
        handleSetAvatarSrc(vals.avatar);
      }
    }
  };

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
      clear: () => {
        form.resetFields();
        setAvatarSrc(null);
        setIsOpen(false);
      },
    };
  }, []);

  return (
    <Modal
      title={"Create profile"}
      open={isOpen}
      onOk={handleConfirm}
      onCancel={() => setIsOpen(false)}
    >
      <Flex
        style={{
          marginBottom: "12px",
        }}
        justify="center"
        align="center"
      >
        <Avatar size="extraLarge" src={avatarSrc} />
      </Flex>
      <Form form={form} onValuesChange={handleFormValuesChange}>
        <Form.Item
          style={{
            marginBottom: "12px",
          }}
          label={null}
          name={"avatar"}
        >
          <Input
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "var(--label)",
            }}
            variant="borderless"
            placeholder="Paste avatar link..."
          />
        </Form.Item>

        <Form.Item
          style={{
            paddingBottom: "16px",
            borderBottom: "1px solid var(--divider)",
          }}
          label={null}
          name={"profile_name"}
        >
          <Input
            style={{ textAlign: "center", fontSize: "16px" }}
            variant="borderless"
            placeholder="Enter name"
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Identity</Label>}
          name={"profile_id"}
        >
          <Input variant="sink" placeholder="Enter Identity" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Email</Label>}
          name={"email"}
        >
          <Input variant="sink" placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Phone</Label>}
          name={"phone_number"}
        >
          <Input variant="sink" placeholder="Enter phone" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Link</Label>}
          name={"profile_url"}
        >
          <Input variant="sink" placeholder="Enter link" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Birth date</Label>}
          name={"birthdate"}
        >
          <Row>
            <Col span={6} style={{ marginRight: "24px" }}>
              <Form.Item name="day" noStyle>
                <Input type="number" variant="sink" placeholder="Date" />
              </Form.Item>
            </Col>

            <Col span={6} style={{ marginRight: "24px" }}>
              <Form.Item name="month" noStyle>
                <Input type="number" variant="sink" placeholder="Month" />
              </Form.Item>
            </Col>

            <Col span={9}>
              <Form.Item name="year" noStyle>
                <Input type="number" variant="sink" placeholder="Year" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Gender</Label>}
          name={"gender"}
        >
          <Select options={genderOptions} placeholder="Select gender" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Education</Label>}
          name={"education"}
        >
          <Input variant="sink" placeholder="Education" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Work</Label>}
          name={"work"}
        >
          <Input variant="sink" placeholder="Work" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          label={<Label>Address</Label>}
          name={"address"}
        >
          <Input variant="sink" placeholder="Address" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default CreateProfileModal;
