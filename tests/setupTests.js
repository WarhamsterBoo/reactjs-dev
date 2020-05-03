import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import serializer from "jest-emotion";

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
