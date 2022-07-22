export const CONFIG_SCHEMA1 = {
  nameSpace1: {
    subNameSpace1: {
      parameter1: {
        type: "string",
        required: true,
      },
      parameter2: {
        type: "integer",
        min: 0,
        default: 5,
      },
    },
    parameter3: {
      type: "boolean",
      default: false,
    },
  },
  nameSpace2: {
    subNameSpace2: {
      parameter4: {
        type: "integer",
        min: -10,
        max: 10,
        default: -2,
      },
    },
    parameter8: {
      type: "string",
      required: false,
    },
  },
};

//initialValue
//form.setFieldsValue
//options varsa veya type boolean ise select ekle
// resolution varsa incrementli bir input ekle
//kalan durumlar düz input
export const CONFIG_SCHEMA2 = {
  parameter10: {
    type: "string", //a value from the given options
    options: ["option1", "option2", "option3"],
    required: true,
    default: null,
  },
  nameSpace3: {
    subNameSpace4: {
      parameter14: {
        type: "boolean",
        default: true,
      },
      parameter15: {
        type: "double",
        min: 0,
        max: 1,
        default: 0.35,
      },
      subNameSpace5: {
        subNameSpace6: {
          parameter16: {
            type: "double",
            min: -1,
            max: 1,
            resolution: 0.1, //number should be increased or decreased by the resolution
            default: 0.7,
          },
          parameter17: {
            type: "string",
          },
        },
      },
    },
    parameter18: {
      type: "integer",
    },
  },
};